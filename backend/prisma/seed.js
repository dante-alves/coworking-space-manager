import '../loadEnv.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN = {
  nome: process.env.ADMIN_NOME ?? 'Administrador',
  email: process.env.ADMIN_EMAIL ?? 'admin@coworking.com',
  senha: process.env.ADMIN_SEED_PASSWORD ?? 'Admin123!',
  telefone: process.env.ADMIN_TELEFONE ?? '83999990000',
  cpf: process.env.ADMIN_CPF ?? '00000000001',
  endereco: {
    rua: process.env.ADMIN_RUA ?? 'Rua Principal',
    numero: process.env.ADMIN_NUMERO ?? '100',
    complemento: null,
    bairro: process.env.ADMIN_BAIRRO ?? 'Centro',
    cep: process.env.ADMIN_CEP ?? '58700000',
    cidade: process.env.ADMIN_CIDADE ?? 'Patos',
    uf: process.env.ADMIN_UF ?? 'PB',
  },
};

async function main() {
  const existente = await prisma.usuario.findUnique({
    where: { email: ADMIN.email },
    select: { id: true, eAdmin: true, email: true },
  });

  if (existente) {
    if (!existente.eAdmin) {
      await prisma.usuario.update({
        where: { id: existente.id },
        data: { eAdmin: true },
      });
      console.log(`Usuário ${ADMIN.email} promovido a administrador.`);
      return;
    }

    console.log(`Administrador já existe: ${ADMIN.email}`);
    return;
  }

  const senhaHash = await bcrypt.hash(ADMIN.senha, 10);

  await prisma.$transaction(async (tx) => {
    const endereco = await tx.endereco.create({ data: ADMIN.endereco });

    await tx.usuario.create({
      data: {
        nome: ADMIN.nome,
        email: ADMIN.email,
        senha: senhaHash,
        telefone: ADMIN.telefone,
        cpf: ADMIN.cpf,
        eAdmin: true,
        idEndereco: endereco.id,
      },
    });
  });

  console.log('Administrador criado com sucesso.');
  console.log(`  Email: ${ADMIN.email}`);
  console.log(`  Senha: ${ADMIN.senha}`);
  console.log('  Altere ADMIN_SEED_PASSWORD em produção.');
}

main()
  .catch((erro) => {
    console.error('Erro ao executar seed:', erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
