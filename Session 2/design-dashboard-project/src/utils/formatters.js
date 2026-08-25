export const formatCurrency=(n)=>`₹${(Number(n)||0).toLocaleString('en-IN')}`;
export const formatDate=(v)=>new Date(v).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
export const formatDuration=(m)=>{const h=Math.floor(m/60),r=m%60;return h?`${h}h ${r}m`:`${r}m`};
