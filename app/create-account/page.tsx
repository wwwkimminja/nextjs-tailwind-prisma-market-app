import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';
import SocialLogin from '@/components/social-login';

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 p-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1>Create Account</h1>
        <h2>Fill in the form below to create your account!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required={true}
          errors={[]}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          errors={[]}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required={true}
          errors={[]}
        />

        <FormButton text="Create Account" loading={false} />
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <SocialLogin />
    </div>
  );
}
