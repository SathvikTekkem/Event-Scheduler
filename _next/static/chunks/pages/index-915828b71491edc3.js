(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{2022:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(1850)}])},1850:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>E});var n=a(4848),l=a(6540),d=a(1401),r=a.n(d);let o=l.memo(e=>{let{date:t,onPrevMonth:a,onNextMonth:l,onPrevYear:d,onNextYear:o}=e;return(0,n.jsxs)("div",{className:r()["calendar-header"],children:[(0,n.jsx)("button",{onClick:d,children:"<<"}),(0,n.jsx)("button",{onClick:a,children:"<"}),(0,n.jsxs)("span",{className:r()["calendar-month-title"],children:[t.toLocaleString("default",{month:"long"})," ",t.getFullYear()]}),(0,n.jsx)("button",{onClick:l,children:">"}),(0,n.jsx)("button",{onClick:o,children:">>"})]})});var s=a(1872),i=a.n(s);let c=e=>{let t=e.getFullYear(),a=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getDate().toString().padStart(2,"0");return"".concat(t,"-").concat(a,"-").concat(n)},v=l.memo(e=>{let{date:t,events:a,onDateClick:l}=e,d=new Date(t.getFullYear(),t.getMonth()+1,0).getDate(),r=new Date(t.getFullYear(),t.getMonth(),1).getDay(),o=[],s=c(new Date);for(let e=0;e<r;e++)o.push((0,n.jsx)("div",{className:"".concat(i()["calendar-cell"]," ").concat(i().empty)},"empty-".concat(e)));for(let e=1;e<=d;e++){let d=c(new Date(t.getFullYear(),t.getMonth(),e)),r=a.filter(e=>e.date===d).length,v=d===s;o.push((0,n.jsxs)("div",{className:"".concat(i()["calendar-cell"]," ").concat(i()[v?"today":""]),onClick:()=>l(d),children:[(0,n.jsx)("span",{children:e}),r>0&&(0,n.jsx)("div",{className:i()["badge-wrapper"],children:(0,n.jsx)("div",{className:i()["event-badge"],title:"Events on this date: ".concat(r),children:r})})]},"day-".concat(e)))}return(0,n.jsx)("div",{className:i()["calendar-grid"],children:o})});var _=a(1703),m=a.n(_);let u=l.memo(e=>{let{selectedDate:t,events:a,newEvent:d,setNewEvent:r,onAddEvent:o,onSaveChanges:s,onClose:i,onEditEvent:c,onDeleteEvent:v,editingEventId:_}=e,[u,h]=(0,l.useState)("");return(0,l.useEffect)(()=>{if(_){let e=a.find(e=>e.id===_);h((null==e?void 0:e.description)||"")}else h("")},[_,a]),(0,n.jsx)("div",{className:m().modal,children:(0,n.jsxs)("div",{className:m()["modal-content"],children:[(0,n.jsxs)("h3",{children:["Events for ",new Date(t).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})]}),(0,n.jsxs)("div",{className:m()["event-list"],children:[a.map(e=>(0,n.jsxs)("div",{className:"".concat(m()["event-list-item"]," ").concat(m()[_===e.id?"highlighted":""]),onClick:()=>c(e),children:[(0,n.jsx)("span",{children:e.description}),(0,n.jsxs)("div",{children:[(0,n.jsx)("button",{className:m()["edit-event-button"],onClick:()=>c(e),children:"Edit"}),(0,n.jsx)("button",{className:m()["delete-event-button"],onClick:()=>v(e.id),children:"Delete"})]})]},e.id)),(0,n.jsx)("input",{className:m().inputField,type:"text",value:_?u:d,onChange:e=>_?h(e.target.value):r(e.target.value),placeholder:_?"Edit event description":"Add event description"})]}),(0,n.jsx)("div",{className:m()["button-group"],children:_?(0,n.jsx)("button",{className:"".concat(m()["modal-btn"]," ").concat(m()["save-event-btn"]),onClick:()=>{_&&u.trim()&&s(_,u)},disabled:!u.trim(),children:"Save Changes"}):(0,n.jsx)("button",{className:"".concat(m()["modal-btn"]," ").concat(m()["add-event-btn"]),onClick:()=>{!_&&d.trim()&&o()},disabled:!d.trim(),children:"Add Event"})}),(0,n.jsx)("button",{className:m()["close-modal-btn"],onClick:i,children:"Close"})]})})});var h=a(4878),g=a.n(h);let p=l.memo(e=>{let{addEventDate:t,setAddEventDate:a,addEventDescription:l,setAddEventDescription:d,onSubmit:r,onClose:o}=e,s=(e,t)=>new Date(t,e,0).getDate(),i=new Date().getFullYear(),c=Array.from({length:10},(e,t)=>i-5+t),v=Array.from({length:12},(e,t)=>t+1),_=["January","February","March","April","May","June","July","August","September","October","November","December"];return(0,n.jsx)("div",{className:g()["modal-add-event"],children:(0,n.jsxs)("div",{className:g()["modal-add-event-content"],children:[(0,n.jsx)("h3",{children:"Create an Event"}),(0,n.jsxs)("div",{className:g()["form-group-day"],children:[(0,n.jsx)("label",{children:"Day:"}),(0,n.jsx)("select",{className:g().selectField,value:t.day,onChange:e=>{let t=parseInt(e.target.value);a(e=>({...e,day:t}))},children:Array.from({length:s(t.month,t.year)},(e,t)=>t+1).map(e=>(0,n.jsx)("option",{value:e,children:e},e))})]}),(0,n.jsxs)("div",{className:g()["form-group-month"],children:[(0,n.jsx)("label",{children:"Month:"}),(0,n.jsx)("select",{className:g().selectField,value:t.month,onChange:e=>{let n=parseInt(e.target.value),l=s(n,t.year),d=t.day>l?l:t.day;a(e=>({...e,month:n,day:d}))},children:v.map(e=>(0,n.jsxs)("option",{value:e,children:[_[e-1]," "]},e))})]}),(0,n.jsxs)("div",{className:g()["form-group-year"],children:[(0,n.jsx)("label",{children:"Year:"}),(0,n.jsx)("select",{className:g().selectField,value:t.year,onChange:e=>{let n=parseInt(e.target.value),l=s(t.month,n),d=t.day>l?l:t.day;a(e=>({...e,year:n,day:d}))},children:c.map(e=>(0,n.jsx)("option",{value:e,children:e},e))})]}),(0,n.jsxs)("div",{className:g()["form-group"],children:[(0,n.jsx)("label",{children:"Event Description:"}),(0,n.jsx)("input",{className:g().input,type:"text",value:l,onChange:e=>d(e.target.value),placeholder:"Enter event description"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("button",{className:g()["modal-btn-add-event"],onClick:()=>{r(),o()},children:"Add Event"}),(0,n.jsx)("button",{className:g()["modal-btn-close-modal"],onClick:o,children:"\xd7"})]})]})})});var x=a(4788),b=a.n(x);let j=l.memo(()=>{let[e,t]=(0,l.useState)(new Date),[a,d]=(0,l.useState)([]),[r,s]=(0,l.useState)(null),[i,c]=(0,l.useState)(""),[_,m]=(0,l.useState)(null),[h,g]=(0,l.useState)(!1),[x,j]=(0,l.useState)({day:1,month:1,year:e.getFullYear()}),[E,C]=(0,l.useState)(""),N=()=>{g(!1),j({day:1,month:1,year:e.getFullYear()}),C("")};return(0,n.jsxs)("div",{className:b()["project-container"],children:[(0,n.jsx)("div",{className:b().title,children:(0,n.jsx)("h2",{children:"Schedule your event"})}),(0,n.jsxs)("div",{className:b()["button-group"],children:[(0,n.jsx)("button",{className:b()["reset-btn"],onClick:()=>{t(new Date),s(null)},children:"Go to Today's Date"}),(0,n.jsxs)("button",{className:b()["add-eventP-btn"],onClick:()=>g(!0),children:[(0,n.jsx)("img",{src:"https://cdn-icons-png.flaticon.com/512/2997/2997933.png",alt:"Add Icon",className:b()["add-event-icon"]}),"Create Event"]})]}),(0,n.jsxs)("div",{className:b()["calendar-container"],children:[(0,n.jsx)(o,{date:e,onPrevMonth:()=>t(new Date(e.getFullYear(),e.getMonth()-1,1)),onNextMonth:()=>t(new Date(e.getFullYear(),e.getMonth()+1,1)),onPrevYear:()=>t(new Date(e.getFullYear()-1,e.getMonth(),1)),onNextYear:()=>t(new Date(e.getFullYear()+1,e.getMonth(),1))}),(0,n.jsx)(v,{date:e,events:a,onDateClick:e=>{s(e),c("")}})," "]}),r&&(0,n.jsx)(u,{selectedDate:r,events:a.filter(e=>e.date===r),newEvent:i,setNewEvent:c,onAddEvent:()=>{r&&i.trim()&&(d(e=>[...e,{id:Date.now().toString(),date:r,description:i.trim()}]),c(""))},onSaveChanges:(e,t)=>{d(a=>a.map(a=>a.id===e?{...a,description:t.trim()}:a)),m(null)},onClose:()=>{s(null),c(""),m(null)},onEditEvent:e=>{m(e.id)},onDeleteEvent:e=>d(a.filter(t=>t.id!==e)),editingEventId:_}),h&&(0,n.jsx)(p,{addEventDate:x,setAddEventDate:j,addEventDescription:E,setAddEventDescription:C,onSubmit:()=>{let{day:e,month:t,year:a}=x,n="".concat(a,"-").concat(String(t).padStart(2,"0"),"-").concat(String(e).padStart(2,"0"));n&&E&&(d(e=>[...e,{id:Date.now().toString(),date:n,description:E}]),N())},onClose:N})]})});function E(){return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(j,{})})}},4878:e=>{e.exports={"modal-add-event":"AddEventModal_modal-add-event__Hgde2","form-group":"AddEventModal_form-group__HiEzI","form-group-day":"AddEventModal_form-group-day__MiSsi","form-group-month":"AddEventModal_form-group-month__7XM0J","form-group-year":"AddEventModal_form-group-year__0waVY",selectField:"AddEventModal_selectField__OWMgI",input:"AddEventModal_input__PIJrd","modal-btn-add-event":"AddEventModal_modal-btn-add-event__Gfw37",textarea:"AddEventModal_textarea__3tquh","modal-btn-close-modal":"AddEventModal_modal-btn-close-modal__wCkR8"}},4788:e=>{e.exports={title:"Calendar_title__k6Hc5","project-container":"Calendar_project-container__P4ww5","reset-btn":"Calendar_reset-btn__kxKYV","add-eventP-btn":"Calendar_add-eventP-btn__zEmmp","add-event-icon":"Calendar_add-event-icon__v7fiN","add-event-btn":"Calendar_add-event-btn__CZX0C","button-group":"Calendar_button-group__M9mTg"}},1872:e=>{e.exports={"calendar-container":"CalendarGrid_calendar-container__I8KqQ","calendar-grid":"CalendarGrid_calendar-grid__w4u9H","calendar-cell":"CalendarGrid_calendar-cell__fRzrq",today:"CalendarGrid_today__580_N",empty:"CalendarGrid_empty__X8XVg","event-badge":"CalendarGrid_event-badge__2aYv1"}},1401:e=>{e.exports={"calendar-container":"CalendarHeader_calendar-container__k5DkX","calendar-header":"CalendarHeader_calendar-header__SsoKP","calendar-month-title":"CalendarHeader_calendar-month-title__STIGW"}},1703:e=>{e.exports={modal:"EventModal_modal__w8Ffr","modal-content":"EventModal_modal-content__Y1Ghf","selected-date-container":"EventModal_selected-date-container__GKgJZ",inputField:"EventModal_inputField__auja4",textareaField:"EventModal_textareaField__fpijT","modal-btn":"EventModal_modal-btn__Mwdlg","add-event-btn":"EventModal_add-event-btn__ACHfF","close-modal-btn":"EventModal_close-modal-btn__CqIg4","event-list":"EventModal_event-list__82b9E","event-list-item":"EventModal_event-list-item__IlQjv",highlighted:"EventModal_highlighted__XBPG4","edit-event-button":"EventModal_edit-event-button__Mkyrc","delete-event-button":"EventModal_delete-event-button__QRO7R","save-event-button":"EventModal_save-event-button__NiXgX","save-event-btn":"EventModal_save-event-btn__MgPv9"}}},e=>{var t=t=>e(e.s=t);e.O(0,[636,593,792],()=>t(2022)),_N_E=e.O()}]);