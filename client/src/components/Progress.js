
const Progress = ({done}) => {
    return (
        <div className="progress">
            <div className="progress-done" style={{opacity: 1, width: `${done}%`}} >
                {done}% complete
            </div>
        </div>
    );
}
 
export default Progress;