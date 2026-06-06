import { useState } from 'react'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import Navbar from './Navbar'
import './shared.css'
import './ListPage.css'

interface Column { key: string; label: string }

interface ListPageProps {
  title: string
  columns: Column[]
  rows: Record<string, string>[]
  newLabel: string
  onNew: () => void
  searchPlaceholder: string
  onEdit?: (row: Record<string, string>) => void
}

export default function ListPage({ title, columns, rows, newLabel, onNew, searchPlaceholder, onEdit }: ListPageProps) {
  const [search, setSearch] = useState('')

  const filtered = rows.filter(row =>
    Object.values(row).some(v => v.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="mock-page">
      <Navbar />
      <div className="lp-content">
        <div className="lp-header">
          <h1 className="lp-title">{title}</h1>
          <button className="mock-btn mock-btn-primary" onClick={onNew}>
            <Plus size={14} />
            {newLabel}
          </button>
        </div>
        <div className="mock-search">
          <Search size={14} className="mock-search-icon" />
          <input
            placeholder={searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="mock-card">
          <table className="mock-table">
            <thead>
              <tr>
                {columns.map(c => <th key={c.key}>{c.label}</th>)}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i}>
                  {columns.map(c => <td key={c.key}>{row[c.key]}</td>)}
                  <td>
                    <div className="lp-actions">
                      <button className="mock-icon-btn" onClick={() => onEdit?.(row)} title="Editar">
                        <Pencil size={13} />
                      </button>
                      <button className="mock-icon-btn lp-delete" title="Eliminar">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
