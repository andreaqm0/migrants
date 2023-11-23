<script lang="ts">
  import { estados_ciudades } from "@/lib/assets/estados_ciudades";

  let editing = false;
  let values: any = {
    organization_name: "Eu ullamco incididunt culpa Lorem labore aliquip.",
    address:
      "Do cillum ullamco mollit nostrud. Nisi veniam consequat in ex consectetur in proident consectetur culpa amet sint magna magna amet. Est tempor amet ex anim sit nostrud veniam reprehenderit ullamco. Cillum amet deserunt cillum incididunt enim excepteur enim exercitation quis aute do in.",
    state: "Baja California Sur",
    city: "La Paz",
  };

  let estados: any = Object.keys(estados_ciudades);
  let ciudades: any = [];
  $: ciudades = getCities();

  function getCities() {
    return Object.keys(estados_ciudades).some((key) =>
      key.includes(values.state!)
    )
      ? Object.entries(estados_ciudades).filter(([key]) =>
          key.includes(values.state!)
        )[0][1]
      : [];
  }

  function changeHandler() {
    ciudades = getCities();
    values.city = null;
  }
</script>

<div class="card bg-base-100 shadow col-span-2">
  <div class="card-body">
    <div class="flex justify-between items-center">
      <h3 class="text-xl text-slate-600 font-semibold">Detalles</h3>
      {#if editing}
        <div>
          <button class="btn btn-sm" on:click={() => (editing = false)}
            >Cancelar</button
          >
          <button
            class="btn btn-sm btn-primary text-white"
            on:click={() => (editing = false)}>Guardar</button
          >
        </div>
      {:else}
        <button
          class="btn btn-primary btn-sm text-white"
          on:click={() => (editing = true)}
        >
          <span class="hidden sm:inline-flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-[14px] h-[14px]"
            >
              <path
                d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
              />
              <path
                d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
              />
            </svg>
            Editar
          </span>
        </button>
      {/if}
    </div>
    <form class="grid grid-cols-2 gap-x-5">
      <div class="form-control col-span-2">
        <label class="label" for=""> Nombre de la organización </label>
        <input
          type="text"
          bind:value={values.organization_name}
          class="input input-bordered disabled:bg-white disabled:cursor-default"
          disabled={!editing}
        />
      </div>
      <div class="form-control col-span-2">
        <label class="label" for="">Dirección</label>
        <textarea
          placeholder="Type here"
          class="textarea textarea-bordered resize-none disabled:bg-white disabled:cursor-default"
          disabled={!editing}
          bind:value={values.address}
        />
      </div>
      <div class="form-control col-span-2 sm:col-span-1">
        <label class="label" for="">Estado</label>
        <select
          class="select select-bordered disabled:bg-white disabled:cursor-default"
          disabled={!editing}
          name="estado"
          bind:value={values.state}
          on:change={changeHandler}
        >
          <option disabled value={null}>---Seleccionar---</option>
          {#each estados as e}
            <option value={e}>{e}</option>
          {/each}
        </select>
      </div>
      <div class="form-control col-span-2 sm:col-span-1">
        <label class="label" for="">Municipio</label>
        <select
          class="select select-bordered disabled:bg-white disabled:cursor-default"
          name="city"
          disabled={!values.state || !editing}
          bind:value={values.city}
        >
          <option value={null}>---Seleccionar---</option>
          {#each ciudades as c}
            <option value={c} selected={values.city === c}>{c}</option>
          {/each}
        </select>
      </div>
    </form>
  </div>
</div>
