import { Button, Form } from "react-bootstrap"


export const CustomInput = ({ title, name, children, required = true, indicator = true, ...props }) => <div className='custom-address overflow-hidden row border-bottom border-light'>
    <div className='mb-1 ms-1'>
        <span>{title}</span>
        {
            required & indicator ?
                <span className="text-danger font-tiny">*</span> : null
        }
    </div>
    <div className='col2'>
        {children || <Form.Control placeholder={title || 'Your Reseponse'} name={name} required={required} {...props} />}
    </div>
</div>

export const InputLayout = (props) => <div className={`bg-white shadow-sm rounded overflow-hidden mb-3 ${props.className || ''}`}>
    {props.children}
</div>


export const SubmitButton = ({ title, children, className, ...props }) => <Button
    type='submit'
    className={'w-100 font-lg text-white my-3 ' + className} {...props}
>
    {children || title}
</Button>