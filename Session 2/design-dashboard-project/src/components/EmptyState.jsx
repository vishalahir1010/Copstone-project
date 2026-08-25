import React from'react';export default function EmptyState({icon='✨',title,text,action}){return <div className="empty"><div>{icon}</div><h3>{title}</h3><p>{text}</p>{action}</div>}
