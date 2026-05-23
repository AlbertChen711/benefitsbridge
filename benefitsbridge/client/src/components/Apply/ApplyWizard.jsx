import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../../context/ApplicationContext';
import ProgressBar from '../common/ProgressBar';
import Tooltip from '../common/Tooltip';

// Helper: calculate benefit (used in expenses and review)
const calcBenefit = (householdSize, income, expenses = 0) => {
  const MAX = [0,292,536,768,994,1180,1415,1606,1838];
  const incomeLimit = householdSize * 2500;
  if (income > incomeLimit) return 0;
  const netIncome = income - income * 0.2;
  let benefit = Math.round(MAX[householdSize] - netIncome * 0.3 - expenses);
  benefit = Math.max(benefit, 23);
  benefit = Math.min(benefit, MAX[householdSize]);
  return benefit;
};

// SSN helpers: clean raw input to digits, and format for display with optional masking
const cleanSSN = (value = '') => ('' + value).replace(/\D/g, '').slice(0,9);
const formatSSNInput = (value = '', show = true) => {
  const digits = cleanSSN(value);
  if (!show && digits.length >= 4) {
    // mask middle digits: XXX-XX-1234
    const last4 = digits.slice(-4);
    return `***-**-${last4}`;
  }
  const parts = [];
  if (digits.length > 0) parts.push(digits.slice(0,3));
  if (digits.length >= 4) parts.push(digits.slice(3,5));
  if (digits.length >= 6) parts.push(digits.slice(5,9));
  return parts.join('-');
}

function AddHouseholdMemberForm({ onAdd }) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [relationship, setRelationship] = React.useState('Other');
  const [applying, setApplying] = React.useState(true);
  const [hasIncome, setHasIncome] = React.useState(false);
  const [ssn, setSsn] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showSsn, setShowSsn] = React.useState(false);
  const [localErrors, setLocalErrors] = React.useState({});

  const submit = () => {
    if (!firstName || !lastName || !dob) {
      // inline validation will surface on form
      setLocalErrors({ addMember: 'First name, last name and date of birth are required.' });
      return;
    }
    onAdd({ firstName, lastName, dob, relationship, applying, hasIncome, ssn, phone });
    setFirstName(''); setLastName(''); setDob(''); setRelationship('Other'); setApplying(true); setHasIncome(false);
    setSsn(''); setPhone('');
    setLocalErrors({});
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First name" className="px-2 py-2 border rounded" />
        <input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last name" className="px-2 py-2 border rounded" />
        <input type="date" value={dob} onChange={(e)=>setDob(e.target.value)} className="px-2 py-2 border rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <div className="flex items-center gap-2">
          <input value={formatSSNInput(ssn, showSsn)} onChange={(e)=>setSsn(cleanSSN(e.target.value))} placeholder="SSN (optional)" className="px-2 py-2 border rounded flex-1" />
          <button type="button" onClick={()=>setShowSsn(s=>!s)} className="text-sm text-primary-600">{showSsn ? 'Hide' : 'Show'}</button>
        </div>
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone (optional)" className="px-2 py-2 border rounded" />
      </div>
  {localErrors.addMember && <div className="text-sm text-red-600 mt-2">{localErrors.addMember}</div>}
      <div className="flex items-center gap-2 mt-2">
        <select value={relationship} onChange={(e)=>setRelationship(e.target.value)} className="px-2 py-2 border rounded">
          <option>Spouse/Partner</option>
          <option>Child</option>
          <option>Parent</option>
          <option>Sibling</option>
          <option>Other relative</option>
          <option>Roommate</option>
          <option>Other</option>
        </select>
        <label className="flex items-center gap-2"><input type="checkbox" checked={applying} onChange={(e)=>setApplying(e.target.checked)} /> Applying?</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={hasIncome} onChange={(e)=>setHasIncome(e.target.checked)} /> Has income?</label>
        <button onClick={submit} className="ml-auto px-3 py-2 bg-primary-600 text-white rounded">Add Household Member</button>
      </div>
    </div>
  );
}

function IncomeSection({ member }) {
  const { updateApplicationData } = useApplication();
  const path = `income_${member.id}`;

  const handleChange = (key, value) => {
    updateApplicationData('incomeEmployment', { [path+key]: value });
  };

  return (
    <div className="bg-white p-3 rounded border">
      <div className="font-medium">{member.firstName} {member.lastName}</div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        <select onChange={(e)=> handleChange('_status', e.target.value)} className="px-2 py-2 border rounded">
          <option>Employed full-time</option>
          <option>Employed part-time</option>
          <option>Self-employed</option>
          <option>Unemployed</option>
          <option>Student</option>
          <option>Retired</option>
          <option>Disabled</option>
        </select>
        <input type="text" placeholder="Employer name" onChange={(e)=> handleChange('_employer', e.target.value)} className="px-2 py-2 border rounded" />
        <input type="number" placeholder="Monthly gross income" onChange={(e)=> handleChange('_amount', Number(e.target.value))} className="px-2 py-2 border rounded" />
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
        <select onChange={(e)=> handleChange('_frequency', e.target.value)} className="px-2 py-2 border rounded">
          <option value="monthly">Monthly</option>
          <option value="biweekly">Biweekly</option>
          <option value="weekly">Weekly</option>
        </select>

        <div className="col-span-2">
          <p className="text-sm font-medium">Other income sources (check those that apply and enter amount)</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {['Child support received','Social Security / SSI','Unemployment benefits','Disability payments','Pension or retirement','Rental income','Other'].map(src => (
              <label key={src} className="flex items-center gap-2">
                <input type="checkbox" onChange={(e)=> handleChange('_other_'+src.replace(/\s+/g,'_'), e.target.checked)} />
                <span className="text-sm">{src}</span>
                <input type="number" placeholder="$" onChange={(e)=> handleChange('_otheramt_'+src.replace(/\s+/g,'_'), Number(e.target.value))} className="ml-2 px-2 py-1 border rounded w-24" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepWrapper({ children, title, subtitle, step, total, onBack }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-fraunces font-bold">{title}</h2>
          <p className="text-neutral-600 mt-1">{subtitle}</p>
        </div>
        <div className="text-right">
          {onBack && (
            <button onClick={onBack} className="text-sm text-neutral-600 underline">Back</button>
          )}
          <p className="text-sm text-neutral-500">Step {step} of {total}</p>
        </div>
      </div>

      <div className="mb-4">
        <ProgressBar currentStep={step - 1} totalSteps={total} />
      </div>

      <div>{children}</div>
    </div>
  );
}

export default function ApplyWizard() {
  const { applicationData, updateApplicationData, saveApplicationData, currentStep, setCurrentStep, savedAt, isSaving, addHouseholdMember, removeHouseholdMember, addDocument, submitApplication } = useApplication();
  const total = 7;
  const navigate = useNavigate();

  const [errors, setErrors] = React.useState({});

  const [localStep, setLocalStep] = React.useState(currentStep || 0);

  React.useEffect(() => setCurrentStep(localStep), [localStep]);

  const next = () => setLocalStep(s => Math.min(total - 1, s + 1));
  const back = () => setLocalStep(s => Math.max(0, s - 1));

  // (formatSSNInput and cleanSSN defined above)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button onClick={saveApplicationData} className="px-4 py-2 bg-neutral-200 rounded-full">Save and Continue Later</button>
        <div className="text-sm text-neutral-500">{isSaving ? 'Saving…' : savedAt ? '✓ Saved' : ''}</div>
      </div>

      {localStep === 0 && (
        <StepWrapper title="Personal Information" subtitle="Tell us who you are" step={1} total={total}>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-800">First name</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  value={applicationData.personalInfo.firstName || ''}
                  onChange={(e) => updateApplicationData('personalInfo', { firstName: e.target.value })}
                  placeholder="Maria"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <Tooltip text="Your legal first name as shown on your ID" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">Last name</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  value={applicationData.personalInfo.lastName || ''}
                  onChange={(e) => updateApplicationData('personalInfo', { lastName: e.target.value })}
                  placeholder="Garcia"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <Tooltip text="Your family name or surname" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-800">Date of birth</label>
                <input
                  type="date"
                  value={applicationData.personalInfo.dob || ''}
                  onChange={(e) => updateApplicationData('personalInfo', { dob: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-800">Social Security Number</label>
                <div className="mt-1">
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="XXX-XX-1234"
                      value={applicationData.personalInfo.ssn ? formatSSNInput(applicationData.personalInfo.ssn, false) : ''}
                      onChange={(e) => updateApplicationData('personalInfo', { ssn: cleanSSN(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <Tooltip text="We will mask most digits for privacy. We only use SSN to verify identity when needed." />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-800">Phone number</label>
                <input
                  placeholder="(555) 555-5555"
                  value={applicationData.personalInfo.phone || ''}
                  onChange={(e) => updateApplicationData('personalInfo', { phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-800">Email (optional)</label>
                <input
                  placeholder="maria@example.com"
                  value={applicationData.personalInfo.email || ''}
                  onChange={(e) => updateApplicationData('personalInfo', { email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md mt-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">Preferred language</label>
              <select value={applicationData.personalInfo.language || 'en'} onChange={(e) => updateApplicationData('personalInfo', { language: e.target.value })} className="mt-1 w-48 px-3 py-2 border rounded-md">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="zh">Mandarin</option>
                <option value="vi">Vietnamese</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => { saveApplicationData(); setErrors(prev=>({...prev, personal: 'Saved'})); setTimeout(()=> setErrors(prev => ({...prev, personal: null})), 1500); }} className="px-4 py-2 bg-neutral-200 rounded-full">Save</button>
              <div className="ml-auto">
                {errors.personal && <div className="text-sm text-green-600 mr-4 inline">{errors.personal}</div>}
                <button
                  type="button"
                  onClick={() => {
                    const p = applicationData.personalInfo || {};
                    if (!p.firstName || !p.lastName || !p.dob) {
                      setErrors(prev=>({...prev, personal: 'First name, last name and DOB are required.'}));
                      return;
                    }
                    next();
                  }}
                  className="px-5 py-3 bg-success-600 text-white rounded-full"
                >Next</button>
              </div>
            </div>
          </form>
        </StepWrapper>
      )}

      {localStep === 1 && (
        <StepWrapper title="Your Address" subtitle="Where you live" step={2} total={total} onBack={back}>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-neutral-800">Street address</label>
            <input
              value={applicationData.addressHousing.street || ''}
              onChange={(e) => updateApplicationData('addressHousing', { street: e.target.value })}
              placeholder="123 Main St"
              className="w-full px-3 py-2 border rounded-md"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-800">Apt / Unit (optional)</label>
                <input value={applicationData.addressHousing.unit || ''} onChange={(e)=> updateApplicationData('addressHousing', { unit: e.target.value })} placeholder="Apt 5B" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-800">County</label>
                <select value={applicationData.addressHousing.county || ''} onChange={(e)=> updateApplicationData('addressHousing', { county: e.target.value })} className="w-full px-3 py-2 border rounded-md">
                  <option value="">Select county</option>
                  {['Alameda','Alpine','Amador','Butte','Calaveras','Colusa','Contra Costa','Del Norte','El Dorado','Fresno','Glenn','Humboldt','Imperial','Inyo','Kern','Kings','Lake','Lassen','Los Angeles','Madera','Marin','Mariposa','Mendocino','Merced','Modoc','Mono','Monterey','Napa','Nevada','Orange','Placer','Plumas','Riverside','Sacramento','San Benito','San Bernardino','San Diego','San Francisco','San Joaquin','San Luis Obispo','San Mateo','Santa Barbara','Santa Clara','Santa Cruz','Shasta','Sierra','Siskiyou','Solano','Sonoma','Stanislaus','Sutter','Tehama','Trinity','Tulare','Tuolumne','Ventura','Yolo','Yuba'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-neutral-800">City</label>
                <input
                  value={applicationData.addressHousing.city || ''}
                  onChange={(e) => updateApplicationData('addressHousing', { city: e.target.value })}
                  placeholder="Los Angeles"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="w-40">
                <label className="block text-sm font-medium text-neutral-800">ZIP code</label>
                <input
                  value={applicationData.addressHousing.zip || ''}
                  onChange={(e) => updateApplicationData('addressHousing', { zip: e.target.value })}
                  placeholder="90001"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">How long have you lived at this address?</label>
              <select value={applicationData.addressHousing.timeAtAddress || ''} onChange={(e)=> updateApplicationData('addressHousing', { timeAtAddress: e.target.value })} className="w-64 px-3 py-2 border rounded-md mt-1">
                <option value="">Select</option>
                <option>Less than 1 month</option>
                <option>1-6 months</option>
                <option>6-12 months</option>
                <option>1-2 years</option>
                <option>More than 2 years</option>
              </select>

              <div className="mt-4">
                <p className="block text-sm font-medium text-neutral-800">Housing situation</p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {[
                    {key:'rent', label:'🏠 I rent my home'},
                    {key:'own', label:'🏡 I own my home'},
                    {key:'stay', label:'🛋 I stay with family or friends'},
                    {key:'temporary', label:'🏨 I am in temporary housing'},
                    {key:'complicated', label:'❓ My situation is complicated'},
                  ].map(h => (
                    <label key={h.key} className={`px-3 py-2 rounded-full border ${applicationData.addressHousing.housingSituation === h.key ? 'bg-primary-100 border-primary-300' : 'bg-white'}`}>
                      <input type="radio" name="housing" className="hidden" checked={applicationData.addressHousing.housingSituation === h.key} onChange={() => updateApplicationData('addressHousing', { housingSituation: h.key })} />
                      <span className="text-sm">{h.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={back} className="px-5 py-3 bg-neutral-200 rounded-full">Back</button>
                <button onClick={() => {
                  const a = applicationData.addressHousing || {};
                  if (!a.street || !a.city || !a.county || !a.zip) { alert('Please check this — it looks like something might be missing'); return; }
                  next();
                }} className="ml-auto px-5 py-3 bg-success-600 text-white rounded-full">Next</button>
              </div>
            </div>
          </div>
        </StepWrapper>
      )}

      {localStep === 2 && (
        <StepWrapper title="Household Members" subtitle="Tell us who lives with you" step={3} total={total} onBack={back}>
          <div className="space-y-4">
            <p className="text-neutral-600">Tell us about everyone who lives with you and shares food and meals</p>
            {/* Show applicant card */}
            <div className="bg-neutral-50 border rounded-lg p-4">You (applicant)</div>

            <div className="space-y-2">
              {(applicationData.householdMembers || []).map((m) => (
                <div key={m.id} className="bg-white border rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{m.firstName} {m.lastName}</div>
                    <div className="text-sm text-neutral-600">{m.relationship}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => {
                      if (window.confirm('Remove this household member?')) {
                        removeHouseholdMember(m.id);
                      }
                    }} className="text-red-600">🗑</button>
                  </div>
                </div>
              ))}

              <AddHouseholdMemberForm onAdd={(member) => addHouseholdMember(member)} />
            </div>

            <div className="flex gap-4">
              <button onClick={back} className="px-5 py-3 bg-neutral-200 rounded-full">Back</button>
              <button onClick={next} className="ml-auto px-5 py-3 bg-success-600 text-white rounded-full">Next</button>
            </div>
          </div>
        </StepWrapper>
      )}

      {localStep === 3 && (
        <StepWrapper title="Income and Employment" subtitle="Tell us about money coming into your home" step={4} total={total} onBack={back}>
          <div>
            <p className="text-neutral-600">List incomes for household members who have income.</p>
            <div className="space-y-3 mt-4">
              {(applicationData.householdMembers || []).map((m) => (
                <IncomeSection key={m.id} member={m} />
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              <button onClick={back} className="px-5 py-3 bg-neutral-200 rounded-full">Back</button>
              <button onClick={next} className="ml-auto px-5 py-3 bg-success-600 text-white rounded-full">Next</button>
            </div>
          </div>
        </StepWrapper>
      )}

      {localStep === 4 && (
        <StepWrapper title="Expenses and Deductions" subtitle="These expenses reduce the income we count against you" step={5} total={total} onBack={back}>
          <div>
            <p className="text-neutral-600">These expenses reduce the income we count against you — so filling this out carefully can increase your benefits!</p>

            <div className="space-y-4 mt-4 bg-white p-4 rounded-lg">
              <label className="block text-sm font-medium">Monthly rent or mortgage amount</label>
              <input type="number" value={applicationData.expensesDeductions?.rent || ''} onChange={(e) => updateApplicationData('expensesDeductions', { rent: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-md" />

              <label className="block text-sm font-medium">Monthly childcare costs</label>
              <input type="number" value={applicationData.expensesDeductions?.childcare || ''} onChange={(e) => updateApplicationData('expensesDeductions', { childcare: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-md" />

              <label className="block text-sm font-medium">Monthly medical expenses (for elderly or disabled members)</label>
              <input type="number" value={applicationData.expensesDeductions?.medical || ''} onChange={(e) => updateApplicationData('expensesDeductions', { medical: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-md" />

              <label className="block text-sm font-medium">Monthly child support payments made</label>
              <input type="number" value={applicationData.expensesDeductions?.childSupport || ''} onChange={(e) => updateApplicationData('expensesDeductions', { childSupport: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-md" />

              <div className="mt-4">
                <p className="font-medium">Estimate</p>
                <p className="text-sm text-neutral-600">Based on your expenses, your estimated monthly benefit is <strong>${calcBenefit(Math.max(1, (applicationData.householdMembers || []).length + 1), Number(applicationData.incomeEmployment?.total || 0), Number(applicationData.expensesDeductions?.rent || 0) + Number(applicationData.expensesDeductions?.medical || 0))}</strong></p>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={back} className="px-5 py-3 bg-neutral-200 rounded-full">Back</button>
              <button onClick={next} className="ml-auto px-5 py-3 bg-success-600 text-white rounded-full">Next</button>
            </div>
          </div>
        </StepWrapper>
      )}

      {localStep === 5 && (
        <StepWrapper title="Document Upload" subtitle="Upload required documents" step={6} total={total} onBack={back}>
          <div>
            <p className="text-neutral-600">Upload photos or files for your documents. You can skip for now.</p>

            <div className="space-y-3 mt-4">
              {['photoId','address','income','ssn','immigration'].map((docId) => (
                <div key={docId} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{docId}</div>
                    <input type="file" accept="image/*,application/pdf" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 10 * 1024 * 1024) {
                        alert('File is over 10MB');
                        return;
                      }
                      addDocument({ docId, name: file.name, size: file.size });
                    }} />
                  </div>
                </div>
              ))}

            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={back} className="px-5 py-3 bg-neutral-200 rounded-full">Back</button>
              <button onClick={next} className="ml-auto px-5 py-3 bg-success-600 text-white rounded-full">Next</button>
            </div>
          </div>
        </StepWrapper>
      )}

      {localStep === 6 && (
        <StepWrapper title="Review and Submit" subtitle="Check everything and submit" step={7} total={total} onBack={back}>
          <div>
            <p className="text-neutral-600">Review your application before submitting.</p>

            <div className="mt-4 bg-white p-4 rounded-lg">
              <h4 className="font-semibold">Personal</h4>
              <p className="text-sm">{(applicationData.personalInfo.firstName || '') + ' ' + (applicationData.personalInfo.lastName || '')}</p>
              <h4 className="font-semibold mt-3">Household</h4>
              <p className="text-sm">{(applicationData.householdMembers || []).length} additional members</p>
            </div>

            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <input type="checkbox" className="w-5 h-5" />
                <span>I confirm that all information I provided is true and accurate to the best of my knowledge</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <input type="checkbox" className="w-5 h-5" />
                <span>I understand that providing false information may result in disqualification and legal consequences</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                <input type="checkbox" className="w-5 h-5" />
                <span>I give permission for my information to be verified with other government agencies</span>
              </label>
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={back} className="px-5 py-3 bg-neutral-200 rounded-full">Back</button>
              <button onClick={async () => { await submitApplication(); navigate('/confirmation'); }} className="ml-auto px-5 py-3 bg-success-600 text-white rounded-full">Submit My Application</button>
            </div>
          </div>
        </StepWrapper>
      )}
    </div>
  );
}
