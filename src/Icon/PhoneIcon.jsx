// Import necessary components from the Material Design Icons library
import { mdiPhone } from '@mdi/js';
import Icon from '@mdi/react';

// Your React component
function PhoneIcon() {
  return (
    <div>
      {/* Display the phone icon */}
      <Icon path={mdiPhone} size={0.5} color="green" />

      {/* Optional: Text next to the icon */}
      <span style={{ marginLeft: '5px' }}>Phone</span>
    </div>
  );
}

export default PhoneIcon
