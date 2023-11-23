<script lang="ts">
  import { onMount } from "svelte";
  import { SortBy } from "./SortBy";
  import { SortOrder } from "@/models/SortOrder";
  import { getMigrantsFilteringParams } from "../../../services/utils";

  let searchString: string;
  let nationality: string;
  let sortBy: SortBy;
  let sortOrder: SortOrder;

  function clear() {
    const url = new URL("/migrants", window.location.origin);
    window.location.assign(url.toString());
  }

  onMount(() => {
    const params = getMigrantsFilteringParams();
    searchString = params.searchString;
    nationality = params.nationality;
    sortBy = params.sortBy;
    sortOrder = params.sortOrder;
  });
</script>

<form class="hidden sm:flex items-center gap-3">
  <div>
    <input
      class="input input-sm input-bordered join-item"
      placeholder="Buscar persona"
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
      class="dropdown-content z-[1] mt-2 card card-compact w-72 p-2 shadow-lg bg-base-100 text-primary-content"
    >
      <div class="card-body">
        <h3 class="card-title">
          <!-- <slot name="clear-icon" /> -->
          Filtrar
        </h3>
        <div class="flex flex-col gap-3" id="form-filter">
          <div class="form-control w-full">
            <label class="label" for="nat">
              <span class="label-text font-semibold">País de Origen</span>
            </label>
            <select
              name="nat"
              class="select select-bordered"
              bind:value={nationality}
            >
              <option value="" disabled>--Selecciona una opción--</option>
              <option value="México">México</option>
              <option value="Colombia">Colombia</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Argentina">Argentina</option>
              <option value="Perú">Perú</option>
            </select>
          </div>
          <div>
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
          <div>
            <span class="label-text font-semibold">Ordenar por</span>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Id</span>
                <input
                  type="radio"
                  name="sort"
                  value="id"
                  class="radio radio-sm"
                  checked={sortBy === "id" || !sortBy}
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Nombre</span>
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  class="radio radio-sm"
                  checked={sortBy === "name"}
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Apellido</span>
                <input
                  type="radio"
                  name="sort"
                  value="lastname"
                  class="radio radio-sm"
                  checked={sortBy === "lastname"}
                />
              </label>
            </div>
          </div>
          <button class="btn btn-primary">Filtrar</button>
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
