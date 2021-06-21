import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'


function Comment() {
    const [comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.target.value)
        console.log (comment)
    }
    return (
        <div>
            <p>If you wish to add additional comments, you can enter them below:</p>
            <TextField 
            id="outlined-basic" 
            label="comment" 
            variant="outlined"
            multiline
            value={comment}
            onChange={handleChange}
            />
        <div>
        <button>submit</button>
        </div>
        </div>

    )
}

export default Comment
