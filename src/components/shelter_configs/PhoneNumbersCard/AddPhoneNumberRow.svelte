<script lang="ts">
  export let FormActive: boolean;

  const defaultValue = {
    mobile_number: null,
    description: null,
    extension: null,
  };

  let formValue = defaultValue;
  let phoneNumberIsValid = false;
  let phoneNumberBlur = false;

  function close() {
    FormActive = false;
    formValue = defaultValue;
  }

  function submitHandler() {
    // TODO:
    close();
  }

  function phoneNumberChangeHandler() {
    const phone = formValue.mobile_number;
    const regexp = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    phoneNumberIsValid = !!phone && regexp.test(phone);
  }

  function extensionChangeHandler() {
    const ext = formValue.extension;
  }
</script>

<th>
  <svg
    class="w-3 h-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"
    />
  </svg>
</th>
<td>
  <input
    type="text"
    class="input input-bordered input-xs w-full max-w-xs"
    bind:value={formValue.description}
  />
</td>
<td>
  <input
    type="text"
    class:input-accent={!phoneNumberIsValid && phoneNumberBlur}
    class="input input-bordered input-xs w-full max-w-xs"
    bind:value={formValue.mobile_number}
    on:change={phoneNumberChangeHandler}
    on:blur={() => (phoneNumberBlur = true)}
  />
</td>
<td>
  <input
    type="text"
    class="input input-bordered input-xs w-full max-w-xs"
    bind:value={formValue.extension}
    on:change={extensionChangeHandler}
  />
</td>
<td>
  <div class="flex justify-center items-center">
    <button
      class="btn btn-xs btn-ghost"
      disabled={!phoneNumberIsValid}
      on:click={submitHandler}
    >
      <svg
        class="w-[11px] h-[11px] text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 12"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5.917 5.724 10.5 15 1.5"
        />
      </svg>
    </button>
    <button class="btn btn-xs btn-ghost" on:click={close}>
      <svg
        class="w-[11px] h-[11px] text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </div>
</td>
