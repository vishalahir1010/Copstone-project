import React from'react';export default function SectionTitle({eyebrow,title,text}){return <div className="sectiontitle"><small>{eyebrow}</small><h2>{title}</h2>{text&&<p>{text}</p>}</div>}
