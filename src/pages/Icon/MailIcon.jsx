// Import necessary components from the Material Design Icons library
import { mdiEmail } from '@mdi/js';
import Icon from '@mdi/react';

// Your React component
function MailIcon() {
  return (
    <div>
      {/* Display the mail icon */}
      <Icon path={mdiEmail} size={0.5} color="red" />

      {/* Optional: Text next to the icon */}
      <span style={{ marginLeft: '5px' }}>Email</span>
    </div>
  );
}

export default MailIcon