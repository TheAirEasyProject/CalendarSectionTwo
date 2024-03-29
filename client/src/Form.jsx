/* eslint-disable import/extensions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar.jsx';
import Guests from './Guests.jsx';
import Summary from './Summary.jsx';
import styles from '../../styles.css';

const Form = ({
  fees, dates, setFees, setDates,
}) => {
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [displayGuests, setDisplayGuests] = useState(false);
  const [form, setForm] = useState({ in: 'Add date', out: 'Add date', days: 0 });
  const [guestBorder, setGuestBorder] = useState(false);
  const [x, setX] = useState(790);
  const [y, setY] = useState(790);
  const [reserve, setReserve] = useState(false);
  const [guests, setGuest] = useState({ adults: 2, children: 0, infants: 0 });
  const [hovering, setHover] = useState(false);
  const totalGuests = guests.adults + guests.children;
  const styling = {
    hover: { backgroundPosition: `${x}px ${y}px`, backgroundImage: 'linear-gradient(to right, #eb1044, #d4115c, #eb1044)' },
    static: { backgroundPosition: '790px 520px', backgroundImage: 'linear-gradient(to right, #d4115c, #eb1044, #d4115c)' },
  };

  const toggleCalendar = () => (
    setDisplayCalendar(!displayCalendar)
  );

  const toggleGuests = () => {
    setGuestBorder(!guestBorder);
    setDisplayGuests(!displayGuests);
  };

  const closeGuests = () => {
    setGuestBorder(false);
    setDisplayGuests(false);
  };

  const mousePosition = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  return (
    <div>
      <div className={styles.form}>
        <div>
          <button
            type="button"
            data-testid="formCalendarTest"
            className={styles.check}
            style={{ borderBottom: guestBorder ? 'none' : '1px solid rgb(179, 179, 179)' }}
            onClick={() => {
              toggleCalendar();
              closeGuests();
            }}
          >
            <div className={styles.checkIn}>
              <div style={{ fontSize: '10px', marginBottom: '5px' }}>CHECK-IN</div>
              <div style={{ color: form.in === 'Add date' ? 'rgb(125, 125, 125)' : 'black', fontFamily: 'Montserrat, sans-serif' }}>{form.in}</div>
            </div>
            <div className={styles.checkOut}>
              <div style={{ fontSize: '10px', marginBottom: '5px' }}>CHECKOUT</div>
              <div style={{ color: form.out === 'Add date' ? 'rgb(125, 125, 125)' : 'black', fontFamily: 'Montserrat, sans-serif' }}>{form.out}</div>
            </div>
          </button>
        </div>
        <div data-testid="openCalendarTest" role="button" tabIndex={0} style={{ display: displayCalendar ? 'block' : 'none' }} onKeyDown={() => setDisplayGuests(false)}>
          <Calendar
            close={toggleCalendar}
            setFees={setFees}
            setDates={setDates}
            dates={dates}
            fees={fees}
            setForm={setForm}
            form={form}
            setReserve={setReserve}
            reserve={reserve}
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="buttonGuestTest"
            className={styles.guestBut}
            style={
              {
                border: guestBorder ? '2px solid black' : 'none', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: guestBorder ? '9px 13px' : '10px 15px',
              }
            }
            onClick={() => {
              toggleGuests();
              setGuestBorder(!guestBorder);
            }}
          >
            <div>
              <div style={{ fontSize: '10px', marginBottom: '5px' }}>GUESTS</div>
              <div data-testid="numOfGuests" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {totalGuests}
                {' '}
                guests
              </div>
            </div>
            {displayGuests ? <div style={{ fontWeight: 'lighter', fontSize: '20px' }}>^</div> : <div style={{ fontWeight: 'lighter', fontSize: '16px' }}>v</div>}
          </button>
          <div data-testid="closeGuestTest" style={{ display: displayGuests ? 'block' : 'none' }}>
            <Guests
              toggleGuests={toggleGuests}
              guests={guests}
              setGuest={setGuest}
            />
          </div>
        </div>
      </div>
      {reserve
        ? (
          <Summary
            fees={fees}
            totalGuests={totalGuests}
            x={x}
            y={y}
            setX={setX}
            setY={setY}
            mousePosition={mousePosition}
            form={form}
            setHover={setHover}
            hovering={hovering}
            styling={styling}
          />
        )
        : (
          <div>
            <button
              type="button"
              className={styles.checkAvailabilityAndReserve}
              style={hovering ? styling.hover : styling.static}
              onMouseMove={(event) => {
                mousePosition(event);
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
                // setX(0);
                // setY(0);
              }}
              onClick={() => toggleCalendar()}
            >
              <div style={{ display: 'inline' }}>
                Check Availability
              </div>
            </button>
          </div>
        )}
    </div>
  );
};

Form.defaultProps = {
  fees: {
    nightlyFee: 0,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
    minNights: 0,
  },
  dates: { reservations: {} },
  setFees: () => null,
  setDates: () => null,
};

Form.propTypes = {
  dates: PropTypes.shape({ reservations: {} }),
  fees: PropTypes.shape(
    {
      nightlyFee: 0,
      cleaningFee: 0,
      serviceFee: 0,
      taxes: 0,
      minNights: 0,
    },
  ),
  setFees: PropTypes.func,
  setDates: PropTypes.func,
};

export default Form;
