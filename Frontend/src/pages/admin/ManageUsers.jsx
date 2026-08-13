import DashboardLayout from '../../components/layout/DashboardLayout';
import styles from './AdminPages.module.css';
import { useState } from 'react';
import { Search, UserCheck, UserX, Shield } from 'lucide-react';

const ALL_USERS = [
  { id: 1, name: 'Arjun Mehta',   email: 'arjun@email.com',  role: 'CUSTOMER', joined: '2026-08-01', status: 'active'    },
  { id: 2, name: 'Priya Sharma',  email: 'priya@shop.com',   role: 'SELLER',   joined: '2026-07-22', status: 'active'    },
  { id: 3, name: 'Ravi Kumar',    email: 'ravi@email.com',   role: 'CUSTOMER', joined: '2026-07-18', status: 'active'    },
  { id: 4, name: 'Helping Hands', email: 'hh@ngo.org',       role: 'NGO',      joined: '2026-07-10', status: 'active'    },
  { id: 5, name: 'Sneha Tandon',  email: 'sneha@email.com',  role: 'CUSTOMER', joined: '2026-07-05', status: 'suspended' },
  { id: 6, name: 'Dev Patel',     email: 'dev@shop.com',     role: 'SELLER',   joined: '2026-06-28', status: 'active'    },
  { id: 7, name: 'EduReach NGO',  email: 'ed@ngo.org',       role: 'NGO',      joined: '2026-06-15', status: 'active'    },
];

const ROLE_COLORS = { CUSTOMER: '96,165,250', SELLER: '227,162,60', NGO: '62,207,142', ADMIN: '226,87,76' };

export default function ManageUsers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const filtered = ALL_USERS.filter(u =>
    (filter === 'ALL' || u.role === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout role="admin" title="Manage Users" subtitle={`${ALL_USERS.length} registered users`}>
      <div className={styles.toolBar}>
        <div className={styles.searchBox}>
          <Search size={15} style={{color:'rgb(var(--c-sage))'}} />
          <input className={styles.searchInput} placeholder="Search by name or email…" value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className={styles.filterBtns}>
          {['ALL','CUSTOMER','SELLER','NGO'].map(r => (
            <button key={r} className={`${styles.filterBtn} ${filter===r?styles.filterActive:''}`} onClick={()=>setFilter(r)}>{r}</button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td className={styles.muted}>{u.id}</td>
                <td className={styles.bold}>{u.name}</td>
                <td className={styles.muted}>{u.email}</td>
                <td><span className={styles.roleBadge} style={{color:`rgb(${ROLE_COLORS[u.role]})`,background:`rgba(${ROLE_COLORS[u.role]},0.1)`}}>{u.role}</span></td>
                <td className={styles.muted}>{u.joined}</td>
                <td>
                  <span className={styles.statusDot} style={{color: u.status==='active'?'rgb(var(--c-emerald))':'rgb(226,87,76)'}}>
                    {u.status==='active'?<UserCheck size={13}/>:<UserX size={13}/>} {u.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtnSm} title="Manage role"><Shield size={13}/></button>
                    <button className={styles.dangerBtnSm} title={u.status==='active'?'Suspend':'Reinstate'}>
                      {u.status==='active'?<UserX size={13}/>:<UserCheck size={13}/>}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
