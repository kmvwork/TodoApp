import { useCallback } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import PropTypes from 'prop-types'

const schema = yup.object().shape({
  value: yup.string().required('Please fill in the description task.'),
  minutes: yup.number().typeError('The value of the Minute field must be a number. ').positive('The value must be a positive number').min(0).integer().required('Please fill in the minutes field.'),
  seconds: yup.string().matches(/^[0-5]?[0-9]$/, 'The value of the Seconds field should be from 0 to 59.').required('Please fill in the seconds field.')
})


const NewTaskForm = ({ onAddItem }) => {
  const handleOnSubmit = () => {
    onAddItem(formik.values)
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      value: '',
      minutes: '',
      seconds: ''
    },
    validationSchema: schema,
    onSubmit: handleOnSubmit
  })

  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value
      }),
    [formik]
  )

  const buttonAdd = formik.values.value && (
    <input
      onClick={formik.handleSubmit}
      type='submit'
      className='btn btn-primary m10'
      value='ADD TASK'
      disabled={!formik.isValid}
    />
  )

  return (
    <form className='new-todo-form' onSubmit={(e) => {
      formik.handleSubmit(e)
    }}>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        value={formik.values.value}
        onChange={(e) => setInputValue('value', e.target.value)}
        name='value'
        required
        autoFocus
      />
      <input
        className='new-todo-form__timer'
        placeholder='Min'
        name='minutes'
        value={formik.values.minutes}
        onChange={(e) => setInputValue('minutes', e.target.value)}
        required
      />
      <input
        className='new-todo-form__timer'
        placeholder='Sec'
        value={formik.values.seconds}
        name='seconds'
        onChange={(e) => setInputValue('seconds', e.target.value)}
        required
      />
      {buttonAdd}
      {
        formik.errors.value && <div className='alert'>{formik.errors.value}</div>
      }
      {
        formik.errors.minutes && <div className='alert'>{formik.errors.minutes}</div>
      }
      {
        formik.errors.seconds && <div className='alert'>{formik.errors.seconds}</div>
      }
    </form>

  )
}

export default NewTaskForm

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func.isRequired
}
