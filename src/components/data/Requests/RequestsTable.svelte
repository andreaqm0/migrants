<script lang="ts">
  import { onMount } from "svelte";
  import { filterSheltersData } from "@/services/utils";
  import Pagination from "../Pagination.svelte";
  import type Shelter from "@/models/Shelter";
  import { getRelativeTime } from "@/services/RelativeTime";

  export let shelters: Shelter[];
  let data: Shelter[] = [];

  // PAGINATION
  let num_per_page = 10;
  let current_page = 1;
  let num_of_pages: number;

  $: num_of_pages = Math.ceil(data.length / num_per_page);
  $: rows = data.filter(
    (_: any, index: number) =>
      index >= (current_page - 1) * num_per_page &&
      index < current_page * num_per_page
  );
  const prevPage = () => (current_page -= 1);
  const nextPage = () => (current_page += 1);
  const startPage = () => (current_page = 1);
  const endPage = () => (current_page = num_of_pages);
  const chageNumPerPage = (num: number) => (num_per_page = num);

  onMount(() => {
    // FILTERING DATA
    data = filterSheltersData(shelters);
  });
</script>

<div>
  <div class="overflow-x-auto">
    <table class="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Ubicación</th>
          <th class="text-center">Fecha de Registro</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each rows as shelter, index}
          <tr>
            <th>{(current_page - 1) * 10 + index + 1}</th>
            <td>{shelter.organization_name}</td>
            <td>
              <div class="flex flex-col">
                <span class="font-semibold">{shelter.state}</span>
                <span>{shelter.city}</span>
              </div>
            </td>
            <td class="text-center">
              <div
                class="tooltip"
                data-tip={new Date(shelter.created_at).toLocaleString("es-mx", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              >
                <div
                  class="badge badge-sm flex gap-1 py-3 cursor-default truncate"
                >
                  <slot name="clock-icon" />
                  {getRelativeTime(shelter.created_at)}
                </div>
              </div>
            </td>
            <td class="text-center">
              <div class="tooltip" data-tip="Aceptar">
                <button class="btn btn-sm btn-ghost">
                  <slot name="check-icon" />
                </button>
              </div>
              <div class="tooltip" data-tip="Rechazar">
                <label for={"del-" + shelter.id} class="btn btn-sm btn-ghost">
                  <slot name="cancel-icon" />
                </label>
              </div>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="5" class="text-sm text-center text-gray-400 py-5">
              No se encontaron resultados
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <Pagination
    {num_of_pages}
    {num_per_page}
    {current_page}
    {prevPage}
    {nextPage}
    {startPage}
    {endPage}
    {chageNumPerPage}
  />
</div>
