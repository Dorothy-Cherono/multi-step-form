import { useState } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(false)

  const [billing, setBilling] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedAddOns, setSelectedAddOns] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })

    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const handleNext = () => {
    const newErrors = {}

    if (step === 1) {
      if (formData.name.trim() === '') {
        newErrors.name = 'This field is required'
      }

      if (formData.email.trim() === '') {
        newErrors.email = 'This field is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }

      if (formData.phone.trim() === '') {
        newErrors.phone = 'This field is required'
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setErrors({})
    setStep(step - 1)
  }

  return (
    <div className="app">
      <div className="form-container">
        <aside className="sidebar">
          <div className={`sidebar-step ${step === 1 ? 'active' : ''}`}>
            <span>1</span>
            <div>
              <small>STEP 1</small>
              <strong>YOUR INFO</strong>
            </div>
          </div>

          <div className={`sidebar-step ${step === 2 ? 'active' : ''}`}>
            <span>2</span>
            <div>
              <small>STEP 2</small>
              <strong>SELECT PLAN</strong>
            </div>
          </div>

          <div className={`sidebar-step ${step === 3 ? 'active' : ''}`}>
            <span>3</span>
            <div>
              <small>STEP 3</small>
              <strong>ADD-ONS</strong>
            </div>
          </div>

          <div className={`sidebar-step ${step === 4 ? 'active' : ''}`}>
            <span>4</span>
            <div>
              <small>STEP 4</small>
              <strong>SUMMARY</strong>
            </div>
          </div>
        </aside>

        <main className="form-content">
          {confirmed ? (
            <div className="thank-you">
              <div className="thank-you-icon">✓</div>

              <h1>Thank you!</h1>

              <p>
                Thanks for confirming your subscription!
                We hope you have fun using our platform.
              </p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <>
                  <h1>Personal info</h1>

                  <p className="description">
                    Please provide your name, email address, and phone number.
                  </p>

                  <div className="input-group">
                    <div className="label-row">
                      <label htmlFor="name">Name</label>

                      {errors.name && <span>{errors.name}</span>}
                    </div>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="e.g. Stephen King"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'input-error' : ''}
                    />
                  </div>

                  <div className="input-group">
                    <div className="label-row">
                      <label htmlFor="email">Email Address</label>

                      {errors.email && <span>{errors.email}</span>}
                    </div>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="e.g. stephenking@lorem.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                    />
                  </div>

                  <div className="input-group">
                    <div className="label-row">
                      <label htmlFor="phone">Phone Number</label>

                      {errors.phone && <span>{errors.phone}</span>}
                    </div>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="e.g. +1 234 567 890"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'input-error' : ''}
                    />
                  </div>

                  <div className="button-area">
                    <button className="next-button" onClick={handleNext}>
                      Next Step
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h1>Select your plan</h1>

                  <p className="description">
                    You have the option of monthly or yearly billing.
                  </p>

                  <div className="plans">
                    <button
                      className={`plan-card ${
                        selectedPlan === 'Arcade' ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedPlan('Arcade')}
                    >
                      <div className="plan-icon arcade-icon"></div>

                      <div className="plan-info">
                        <strong>Arcade</strong>

                        <span>
                          {billing === 'monthly' ? '$9/mo' : '$90/yr'}
                        </span>

                        {billing === 'yearly' && (
                          <small>2 months free</small>
                        )}
                      </div>
                    </button>

                    <button
                      className={`plan-card ${
                        selectedPlan === 'Advanced' ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedPlan('Advanced')}
                    >
                      <div className="plan-icon advanced-icon"></div>

                      <div className="plan-info">
                        <strong>Advanced</strong>

                        <span>
                          {billing === 'monthly' ? '$12/mo' : '$120/yr'}
                        </span>

                        {billing === 'yearly' && (
                          <small>2 months free</small>
                        )}
                      </div>
                    </button>

                    <button
                      className={`plan-card ${
                        selectedPlan === 'Pro' ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedPlan('Pro')}
                    >
                      <div className="plan-icon pro-icon"></div>

                      <div className="plan-info">
                        <strong>Pro</strong>

                        <span>
                          {billing === 'monthly' ? '$15/mo' : '$150/yr'}
                        </span>

                        {billing === 'yearly' && (
                          <small>2 months free</small>
                        )}
                      </div>
                    </button>
                  </div>

                  <div className="billing-toggle">
                    <span>Monthly</span>

                    <button
                      className="toggle"
                      onClick={() =>
                        setBilling(
                          billing === 'monthly' ? 'yearly' : 'monthly'
                        )
                      }
                    >
                      <div
                        className={`toggle-circle ${
                          billing === 'yearly' ? 'yearly' : ''
                        }`}
                      ></div>
                    </button>

                    <span>Yearly</span>
                  </div>

                  <div className="button-area">
                    <button className="back-button" onClick={handleBack}>
                      Go Back
                    </button>

                    <button className="next-button" onClick={handleNext}>
                      Next Step
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h1>Pick add-ons</h1>

                  <p className="description">
                    Add-ons help enhance your gaming experience.
                  </p>

                  <div className="addons">
                    <label
                      className={`addon-card ${
                        selectedAddOns.includes('Online service')
                          ? 'selected'
                          : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAddOns.includes('Online service')}
                        onChange={() => {
                          if (selectedAddOns.includes('Online service')) {
                            setSelectedAddOns(
                              selectedAddOns.filter(
                                (addon) => addon !== 'Online service'
                              )
                            )
                          } else {
                            setSelectedAddOns([
                              ...selectedAddOns,
                              'Online service',
                            ])
                          }
                        }}
                      />

                      <div className="addon-info">
                        <strong>Online service</strong>
                        <span>Access to multiplayer games</span>
                      </div>

                      <div className="addon-price">
                        {billing === 'monthly' ? '+$1/mo' : '+$10/yr'}
                      </div>
                    </label>

                    <label
                      className={`addon-card ${
                        selectedAddOns.includes('Larger storage')
                          ? 'selected'
                          : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAddOns.includes('Larger storage')}
                        onChange={() => {
                          if (selectedAddOns.includes('Larger storage')) {
                            setSelectedAddOns(
                              selectedAddOns.filter(
                                (addon) => addon !== 'Larger storage'
                              )
                            )
                          } else {
                            setSelectedAddOns([
                              ...selectedAddOns,
                              'Larger storage',
                            ])
                          }
                        }}
                      />

                      <div className="addon-info">
                        <strong>Larger storage</strong>
                        <span>Extra 1TB of cloud save</span>
                      </div>

                      <div className="addon-price">
                        {billing === 'monthly' ? '+$2/mo' : '+$20/yr'}
                      </div>
                    </label>

                    <label
                      className={`addon-card ${
                        selectedAddOns.includes('Customizable Profile')
                          ? 'selected'
                          : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAddOns.includes(
                          'Customizable Profile'
                        )}
                        onChange={() => {
                          if (
                            selectedAddOns.includes('Customizable Profile')
                          ) {
                            setSelectedAddOns(
                              selectedAddOns.filter(
                                (addon) => addon !== 'Customizable Profile'
                              )
                            )
                          } else {
                            setSelectedAddOns([
                              ...selectedAddOns,
                              'Customizable Profile',
                            ])
                          }
                        }}
                      />

                      <div className="addon-info">
                        <strong>Customizable Profile</strong>
                        <span>Custom theme on your profile</span>
                      </div>

                      <div className="addon-price">
                        {billing === 'monthly' ? '+$2/mo' : '+$20/yr'}
                      </div>
                    </label>
                  </div>

                  <div className="button-area">
                    <button className="back-button" onClick={handleBack}>
                      Go Back
                    </button>

                    <button className="next-button" onClick={handleNext}>
                      Next Step
                    </button>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h1>Finishing up</h1>

                  <p className="description">
                    Double-check everything looks OK before confirming.
                  </p>

                  <div className="summary">
                    <div className="summary-plan">
                      <div>
                        <strong>
                          {selectedPlan || 'No plan selected'} (
                          {billing === 'monthly' ? 'Monthly' : 'Yearly'})
                        </strong>

                        <button onClick={() => setStep(2)}>
                          Change
                        </button>
                      </div>

                      <strong>
                        {selectedPlan === 'Arcade' &&
                          (billing === 'monthly' ? '$9/mo' : '$90/yr')}

                        {selectedPlan === 'Advanced' &&
                          (billing === 'monthly' ? '$12/mo' : '$120/yr')}

                        {selectedPlan === 'Pro' &&
                          (billing === 'monthly' ? '$15/mo' : '$150/yr')}
                      </strong>
                    </div>

                    <div className="summary-divider"></div>

                    {selectedAddOns.length === 0 ? (
                      <p className="no-addons">
                        No add-ons selected.
                      </p>
                    ) : (
                      selectedAddOns.map((addon) => (
                        <div className="summary-addon" key={addon}>
                          <span>{addon}</span>

                          <span>
                            {addon === 'Online service' &&
                              (billing === 'monthly'
                                ? '+$1/mo'
                                : '+$10/yr')}

                            {addon === 'Larger storage' &&
                              (billing === 'monthly'
                                ? '+$2/mo'
                                : '+$20/yr')}

                            {addon === 'Customizable Profile' &&
                              (billing === 'monthly'
                                ? '+$2/mo'
                                : '+$20/yr')}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="total">
                    <span>
                      Total (per{' '}
                      {billing === 'monthly' ? 'month' : 'year'})
                    </span>

                    <strong>
                      $
                      {(
                        (selectedPlan === 'Arcade'
                          ? billing === 'monthly'
                            ? 9
                            : 90
                          : selectedPlan === 'Advanced'
                            ? billing === 'monthly'
                              ? 12
                              : 120
                            : selectedPlan === 'Pro'
                              ? billing === 'monthly'
                                ? 15
                                : 150
                              : 0) +
                        selectedAddOns.reduce((total, addon) => {
                          if (addon === 'Online service') {
                            return (
                              total +
                              (billing === 'monthly' ? 1 : 10)
                            )
                          }

                          if (addon === 'Larger storage') {
                            return (
                              total +
                              (billing === 'monthly' ? 2 : 20)
                            )
                          }

                          if (addon === 'Customizable Profile') {
                            return (
                              total +
                              (billing === 'monthly' ? 2 : 20)
                            )
                          }

                          return total
                        }, 0)
                      )}
                      {billing === 'monthly' ? '/mo' : '/yr'}
                    </strong>
                  </div>

                  <div className="button-area">
                    <button className="back-button" onClick={handleBack}>
                      Go Back
                    </button>

                    <button
                      className="confirm-button"
                      onClick={() => setConfirmed(true)}
                    >
                      Confirm
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default App