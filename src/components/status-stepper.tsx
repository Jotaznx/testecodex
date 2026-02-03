import { clsx } from 'clsx';
import { OrderStatus } from '@/lib/types';

const steps: OrderStatus[] = [
  'CRIADO',
  'CONFIRMADO',
  'A_CAMINHO',
  'CHEGOU_NO_PORTAO',
  'ENTREGUE'
];

export function StatusStepper({ status }: { status: OrderStatus }) {
  const activeIndex = steps.indexOf(status);

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3">
          <div
            className={clsx(
              'flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold',
              index <= activeIndex
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-slate-200 bg-white text-slate-400'
            )}
          >
            {index + 1}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{step.replace(/_/g, ' ')}</p>
            <p className="text-xs text-slate-500">
              {index <= activeIndex ? 'Concluído' : 'Pendente'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
