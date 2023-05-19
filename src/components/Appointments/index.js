import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    nameInput: '',
    dateInput: '',
    isFilterActive: false,
    appointments: [],
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointments = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      name: nameInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  onChangeInputTitle = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeInputDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointments, isFilterActive} = this.state

    if (isFilterActive) {
      return appointments.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointments
  }

  render() {
    const {nameInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="items-container">
            <form onSubmit={this.onAddAppointments}>
              <h1 className="heading">Add Appointment</h1>
              <div className="inputs-container">
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  className="input"
                  value={nameInput}
                  onChange={this.onChangeInputTitle}
                />
                <label htmlFor="date" className="label">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="input"
                  value={dateInput}
                  onChange={this.onChangeInputDate}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <hr className="hr-line" />
          <div className="header-with-filter-container">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={`filter-starred-btn ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
