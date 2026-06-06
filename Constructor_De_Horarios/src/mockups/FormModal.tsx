import { X } from 'lucide-react'
import './shared.css'
import './FormModal.css'

type FieldType = 'text' | 'email' | 'tel' | 'number' | 'select' | 'checkboxes'

export interface FormField {
  key: string
  label: string
  placeholder?: string
  type?: FieldType
  options?: string[]
}

interface FormModalProps {
  title: string
  fields: FormField[]
  onCancel: () => void
  onSave: () => void
}

export default function FormModal({ title, fields, onCancel, onSave }: FormModalProps) {
  return (
    <div className="fm-overlay" onClick={e => { if (e.target === e.currentTarget) onCancel() }}>
      <div className="fm-card">
        <div className="fm-header">
          <h2 className="fm-title">{title}</h2>
          <button className="fm-close" onClick={onCancel}><X size={16} /></button>
        </div>
        <div className="fm-body">
          {fields.map(f => (
            <div key={f.key} className="mock-field">
              <label className="mock-label">{f.label}</label>
              {f.type === 'select' ? (
                <select className="mock-input mock-select">
                  <option value="">{f.placeholder ?? 'Seleccione...'}</option>
                  {f.options?.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : f.type === 'checkboxes' ? (
                <div className="fm-checkboxes">
                  {f.options?.map(o => (
                    <label key={o} className="fm-checkbox-label">
                      <input type="checkbox" className="fm-checkbox" />
                      {o}
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  className="mock-input"
                  type={f.type ?? 'text'}
                  placeholder={f.placeholder}
                />
              )}
            </div>
          ))}
        </div>
        <div className="fm-footer">
          <button className="mock-btn mock-btn-outline" onClick={onCancel}>Cancelar</button>
          <button className="mock-btn mock-btn-primary" onClick={onSave}>Guardar</button>
        </div>
      </div>
    </div>
  )
}
