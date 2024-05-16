let f={comma(t){return f.split(t,[","],!0)},space(t){let i=[" ",`
`,"	"];return f.split(t,i)},split(t,i,c){let r=[],l="",u=!1,s=0,a=!1,n="",p=!1;for(let e of t)p?p=!1:e==="\\"?p=!0:a?e===n&&(a=!1):e==='"'||e==="'"?(a=!0,n=e):e==="("?s+=1:e===")"?s>0&&(s-=1):s===0&&i.includes(e)&&(u=!0),u?(l!==""&&r.push(l.trim()),l="",u=!1):l+=e;return(c||l!=="")&&r.push(l.trim()),r}};f.default=f;
