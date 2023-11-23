<script lang="ts">
  import AddPhoneNumberRow from "./AddPhoneNumberRow.svelte";

  let phoneNumbers = [
    {
      id: 1,
      mobile_number: "(664) 127-5561",
      description: "Minim voluptate deserunt",
      extension: "1231",
    },
    {
      id: 2,
      mobile_number: "(664) 273-2938",
      description: "Dolore id est exercitation consequat eiusmod.",
      extension: "",
    },
    {
      id: 3,
      mobile_number: "(664) 283-1929",
      description: "Aliquip deserunt excepteur nisi",
      extension: "1929",
    },
    {
      id: 4,
      mobile_number: "(664) 129-1929",
      description: "Enim elit commodo eiusmod",
      extension: "1927",
    },
  ];
  let FormActive = false;

  function deletePhoneNum(id: number) {
    alert("Borrado! " + id);
  }
</script>

<div class="card bg-base-100 shadow col-span-2 xl:col-span-1">
  <div class="card-body">
    <div class="flex justify-between items-center">
      <h3 class="text-xl text-slate-600 font-semibold">Teléfonos</h3>
      <button
        class="btn btn-primary btn-sm text-white"
        disabled={FormActive}
        on:click={() => (FormActive = true)}
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
        Agregar
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th />
            <th>Descripción</th>
            <th>Teléfono</th>
            <th>Ext</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr class:hidden={!FormActive}>
            <AddPhoneNumberRow bind:FormActive />
          </tr>
          {#each phoneNumbers as pn, index}
            <tr>
              <th>{index + 1}</th>
              <td>{pn.description}</td>
              <td class="truncate">{pn.mobile_number}</td>
              <td>{pn.extension || ""}</td>
              <td>
                <div
                  class="flex justify-center items-center"
                  class:hidden={FormActive}
                >
                  <label for={"edit-" + pn.id} class="btn btn-xs btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-[14px] h-[14px] text-gray-600"
                    >
                      <path
                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                      />
                      <path
                        d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                      />
                    </svg>
                  </label>
                  <label for={"del-" + pn.id} class="btn btn-xs btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[14px] h-[14px] text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </label>
                  <!-- <EditPhoneNumber id={"edit-" + pn.id} phone={pn} /> -->
                  <!-- <Warning
                    id={"del-" + pn.id}
                    clickHandler={() => deletePhoneNum(pn.id)}
                    btnText="Eliminar"
                    heading="¿Seguro que deseas eliminar esto?"
                    description={`Estas a punto de eliminar el número de teléfono: <strong>${pn.mobile_number}</strong>`}
                  /> -->
                </div>
                <div
                  class="flex justify-center items-center"
                  class:hidden={!FormActive}
                >
                  <button
                    class="btn btn-xs btn-ghost disabled:bg-white"
                    disabled
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-[14px] h-[14px] text-gray-600"
                    >
                      <path
                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
                      />
                      <path
                        d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
                      />
                    </svg>
                  </button>
                  <button
                    class="btn btn-xs btn-ghost disabled:bg-white"
                    disabled
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[14px] h-[14px] text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
