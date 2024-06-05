const forgetPassword = () => {
  return `<div class="flex items-center justify-center max-w-full h-screen">
  <div
    class="w-96 rounded-md shadow-lg px-4 py-8 backdrop-blur-xl bg-pink-800"
  >
    <h1
      class="font-bold text-2xl flex justify-center items-center text-white"
    >
      Forget password
    </h1>
    <div class="flex-col mb-4">
      <label class="text-white">Email</label>
      <input
        id="email"
        placeholder="me@example.com"
        required
        class="w-full outline-none border-none rounded-md px-2 py-3 mt-2"
        type="email"
      />
    </div>
    <div class="my-4 mt-12">
      <button
        type="submit"
        id="btn-confirm"
        class="text-pink-900 text-xl bg-pink-300 w-full rounded-md px-2 py-3"
      >
        Confirm
      </button>
    </div>
  </div>
</div>`;
};
export default forgetPassword;
