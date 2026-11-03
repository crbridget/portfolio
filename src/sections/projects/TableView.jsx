import { Fragment, useState } from 'react'
import ExternalLink from '../../components/ExternalLink.jsx'
import { GithubIcon } from '../../components/icons.jsx'
import ProjectThumb from '../../components/ProjectThumb.jsx'

const COLUMNS = [
  { key: 'num', label: 'idx', width: '52px' },
  { key: 'title', label: 'project', width: 'auto' },
  { key: 'category', label: 'category', width: '200px' },
  { key: 'tags', label: 'tools', width: '200px' },
]

function ExpandedRow({ project: p }) {
  return (
    <tr className="df-expanded-row">
      <td colSpan={COLUMNS.length}>
        <div className="df-expanded">
          <div className="df-expanded-thumb">
            <ProjectThumb project={p} />
          </div>
          <div className="df-expanded-info">
            <div className="df-expanded-title">{p.title}</div>
            <div className="df-expanded-desc">{p.desc}</div>
            <div className="df-expanded-meta">
              <span>
                <b>category:</b> {p.category}
              </span>
              <span>
                <b>tools:</b> {p.tags.join(' · ')}
              </span>
            </div>
            {p.github && (
              <ExternalLink href={p.github} className="proj-link">
                <GithubIcon size={10} />
                view source
              </ExternalLink>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}

// Pandas-DataFrame-styled, sortable project table.
export default function TableView({ projects }) {
  const [sortKey, setSortKey] = useState(null)
  const [dir, setDir] = useState(1)
  const [expanded, setExpanded] = useState(null)

  const sorted = sortKey
    ? [...projects].sort((a, b) => (a[sortKey] < b[sortKey] ? -dir : dir))
    : projects

  function toggleSort(key) {
    if (sortKey === key) setDir((d) => -d)
    else {
      setSortKey(key)
      setDir(1)
    }
  }

  return (
    <div className="df-wrap">
      <div className="df-header">
        <span className="df-shape">
          DataFrame({projects.length} rows × {COLUMNS.length} cols)
        </span>
      </div>
      <div className="df-table-wrap">
        <table className="df-table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.key} style={{ width: c.width }} onClick={() => toggleSort(c.key)}>
                  {c.label}
                  {sortKey === c.key && <span className="df-sort">{dir > 0 ? ' ↑' : ' ↓'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const isOpen = expanded === p.title
              const rowClass = ['df-row', isOpen && 'df-row-active', i % 2 === 0 && 'df-row-even']
                .filter(Boolean)
                .join(' ')
              return (
                <Fragment key={p.title}>
                  <tr className={rowClass} onClick={() => setExpanded(isOpen ? null : p.title)}>
                    <td className="df-idx">{i}</td>
                    <td className="df-project">
                      <span className="df-num">{p.num}</span> {p.title}
                    </td>
                    <td>
                      <span className="df-cat-pill">{p.category}</span>
                    </td>
                    <td className="df-tools">{p.tags.join(', ')}</td>
                  </tr>
                  {isOpen && <ExpandedRow project={p} />}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
