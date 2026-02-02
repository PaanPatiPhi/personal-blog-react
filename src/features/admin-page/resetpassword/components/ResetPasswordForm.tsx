import FormInput from "./FormInput";
 export default function ResetPasswordForm() {
     return ( <form className="max-w-md space-y-6">
         <FormInput label="Current password" placeholder="Current password" type="password" />
          <FormInput label="New password" placeholder="New password" type="password" /> 
          <FormInput label="Confirm new password" placeholder="Confirm new password" type="password" /> 
          </form> 
          ); 
        }