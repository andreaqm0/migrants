<script lang="ts">
    import { onMount } from "svelte";
    import { SortBy } from "./SortBy";
    import { SortOrder } from "@/models/SortOrder";
    import { getSheltersFilteringParams } from "@/services/utils";
    import { estados_ciudades } from "@/lib/assets/estados_ciudades";
    //   estados - ciudades
    let estados: any = Object.keys(estados_ciudades);
    let ciudades: any = [];
  
    // filtering
    let searchString: string;
    let state: string;
    let city: string;
    let sortBy: SortBy;
    let sortOrder: SortOrder;
    let from: string;
    let to: string | undefined;
  
    function clear() {
      const url = new URL("/requests", window.location.origin);
      window.location.assign(url.toString());
    }
  
    $: ciudades = Object.keys(estados_ciudades).some((key) => key.includes(state))
      ? Object.entries(estados_ciudades).filter(([key]) =>
          key.includes(state)
        )[0][1]
      : [];
  
    function changeHandler() {
      city = "";
    }
  
    onMount(() => {
      const params = getSheltersFilteringParams();
      searchString = params.searchString;
      state = params.state;
      city = params.city;
      sortBy = params.sortBy;
      sortOrder = params.sortOrder;
      from = params.from;
      to = params.to;
    });
  </script>
  
  <form class="hidden sm:flex items-center gap-3">
    <div>
      <input
        class="input input-sm input-bordered join-item"
        placeholder="Buscar refugio"
        name="q"
        bind:value={searchString}
      />
    </div>
    <div class="dropdown dropdown-bottom dropdown-end">
      <label tabindex="-1" for="" class="btn btn-sm btn-outline border-gray-300">
        <slot name="filter-icon" />
        <span>Filtrar</span>
      </label>
      <div
        tabindex="-1"
        class="dropdown-content z-[1] mt-2 card card-compact w-[50vw] xl:w-[40vw] p-2 shadow-lg bg-base-100 text-primary-content"
      >
        <div class="card-body">
          <h3 class="card-title">Filtrar</h3>
          <div class="grid grid-cols-2 gap-3">
            <div class="form-control col-span-2 md:col-span-1">
              <label class="label" for="">Estado</label>
              <select
                class="select select-bordered disabled:bg-white disabled:cursor-default"
                name="state"
                bind:value={state}
                on:change={changeHandler}
              >
                <option disabled value="">---Seleccionar Estado---</option>
                {#each estados as e}
                  <option value={e}>{e}</option>
                {/each}
              </select>
            </div>
            <div class="form-control col-span-2 md:col-span-1">
              <label class="label" for="">Municipio</label>
              <select
                class="select select-bordered disabled:bg-white disabled:cursor-default"
                name="city"
                disabled={!state}
                bind:value={city}
              >
                <option value="">---Seleccionar---</option>
                {#each ciudades as c}
                  <option value={c}>{c}</option>
                {/each}
              </select>
            </div>
            <div class="col-span-2">
              <span class="label-text font-semibold">Fecha de Registro</span>
              <div class="grid grid-cols-2 gap-3">
                <div class="form-control col-span-2 md:col-span-1">
                  <label for="" class="label">
                    <span class="label-text">Desde:</span>
                  </label>
                  <input
                    class="input input-bordered"
                    type="date"
                    name="from"
                    bind:value={from}
                  />
                </div>
                <div class="form-control col-span-2 md:col-span-1">
                  <label for="" class="label">
                    <span class="label-text">Hasta:</span>
                  </label>
                  <input
                    class="input input-bordered"
                    type="date"
                    name="to"
                    bind:value={to}
                  />
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <span class="label-text font-semibold">Ordenar</span>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Ascendente</span>
                  <input
                    type="radio"
                    name="ord"
                    value="asc"
                    class="radio radio-sm"
                    checked={sortOrder === "asc" || !sortOrder}
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Descentente</span>
                  <input
                    type="radio"
                    name="ord"
                    value="desc"
                    class="radio radio-sm"
                    checked={sortOrder === "desc"}
                  />
                </label>
              </div>
            </div>
            <div class="col-span-2">
              <span class="label-text font-semibold">Ordenar por</span>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Nombre</span>
                  <input
                    type="radio"
                    name="sort"
                    value="organization_name"
                    class="radio radio-sm"
                    checked={sortBy === "organization_name"}
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Estado</span>
                  <input
                    type="radio"
                    name="sort"
                    value="state"
                    class="radio radio-sm"
                    checked={sortBy === "state"}
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Municipio</span>
                  <input
                    type="radio"
                    name="sort"
                    value="city"
                    class="radio radio-sm"
                    checked={sortBy === "city"}
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">Fecha de registro</span>
                  <input
                    type="radio"
                    name="sort"
                    value="created_at"
                    class="radio radio-sm"
                    checked={sortBy === "created_at"}
                  />
                </label>
              </div>
            </div>
            <button class="btn btn-primary col-span-2">Filtrar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="tooltip" data-tip="Limpiar Filtros">
      <button
        class="btn btn-sm btn-circle btn-outline border-gray-300"
        type="button"
        on:click={clear}
      >
        <slot name="clear-icon" />
      </button>
    </div>
  </form>
  