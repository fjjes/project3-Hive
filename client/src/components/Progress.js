
const Progress = ({done}) => {
    return (
        <div className="progress">
            {done===0?
            <div className="progress-done zero" style={{opacity: 1, width: `${done}%`}} >  
            {done}% complete  
            </div>
            :
            <div className="progress-done" style={{opacity: 1, width: `${done}%`}} >  
            {done}% complete  
            </div>
         }   
        </div>
    );
}
 
export default Progress;