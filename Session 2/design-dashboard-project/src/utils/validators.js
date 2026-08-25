export const isValidEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v||'');
export const isValidPhone=v=>/^[6-9]\d{9}$/.test((v||'').replace(/\s/g,''));
export function validateCheckoutForm(f){const e={};if(!f.fullName?.trim())e.fullName='Full name is required';if(!isValidPhone(f.phone))e.phone='Enter a valid 10-digit phone';if(!f.address?.trim())e.address='Address is required';if(!/^\d{6}$/.test(f.pincode||''))e.pincode='Enter a valid 6-digit pincode';return e}
export function validateMovieBookingForm(f){const e={};if(!f.name?.trim())e.name='Name is required';if(!isValidEmail(f.email))e.email='Valid email is required';if(!isValidPhone(f.phone))e.phone='Valid phone is required';return e}
