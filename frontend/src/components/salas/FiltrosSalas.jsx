import { FormSelect } from "@/components/form/form-select"
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react';
import { TURNOS, diaApiParaDate, diaParaApi, formatarDiaExibicao, } from "@/lib/formatadores";
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from '@/lib/utils';

export function FiltrosSalas({ dia, turno, onDiaChange, onTurnoChange }) {
    const [aberto, setAberto] = useState(false);
    const dataSelecionada = diaApiParaDate(dia);

    return (
        <div className="rounded-lg border border-border p-4 flex flex-col gap-4">
            <p className="text-sm font-medium">Filtrar por:</p>

            <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="dia-exibicao" className="text-sm">
                        Dia
                    </label>
                    
                    <Popover open={aberto} onOpenChange={setAberto}>
                        <PopoverTrigger asChild>
                            <button
                                id='dia-exibicao'
                                type='button'
                                className={cn(
                                    "flex h-9 w-[180px] items-center justify-between rounded-md border border-input",
                                    "bg-background px-3 text-sm shadow-xs hover:bg-muted/50"
                                )}
                            >
                                <span>{formatarDiaExibicao(dia)}</span>
                                <CalendarIcon className='h-4 w-4 text-muted-foreground' />
                            </button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto p-0" align='start'>
                                <Calendar
                                    mode="single"
                                    selected={dataSelecionada}
                                    captionLayout="dropdown"
                                    onSelect={(data) => {
                                    if (data) {
                                        onDiaChange(diaParaApi(data))
                                        setAberto(false)
                                    }
                                    }}
                                />
                        </PopoverContent>
                    </Popover>
                </div>

                <FormSelect
                    id="turno"
                    label="Turno"
                    value={turno}
                    onChange={onTurnoChange}
                    options={TURNOS.map(({ valor, label }) => ({
                        value: valor,
                        label,
                    }))}
                />
            </div>
        </div>
    )
}