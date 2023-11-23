<script lang="ts">
  import { onMount } from "svelte";
  import { filterMigrantsData } from "@/services/utils";
  import Pagination from "../Pagination.svelte";

  export let people: any;
  let data: any = [];

  // PAGINATION
  let num_per_page = 10;
  let current_page = 1;
  let num_of_pages: number;

  $: num_of_pages = Math.ceil(data.length / num_per_page);
  $: rows = data.filter(
    (el: any, index: number) =>
      index >= (current_page - 1) * num_per_page &&
      index < current_page * num_per_page
  );
  const prevPage = () => (current_page -= 1);
  const nextPage = () => (current_page += 1);
  const startPage = () => (current_page = 1);
  const endPage = () => (current_page = num_of_pages);
  const chageNumPerPage = (num: number) => (num_per_page = num) 

  onMount(() => {
    // FILTERING DATA
    data = filterMigrantsData(people);
  });
</script>

<div>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th> #</th>
          <th>Persona</th>
          <th class="text-center">País de Origen</th>
          <th class="text-center">Contacto</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each rows as person, index}
          <tr>
            <th>{(current_page - 1) * 10 + index + 1}</th>
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img src={person.imgUrl} alt="product img" />
                  </div>
                </div>
                <div>
                  <div class="font-bold text-gray-600">
                    {person.name}
                    {person.lastname}
                  </div>
                  <div class="text-sm opacity-50">ID-{person.id}</div>
                </div>
              </div>
            </td>
            <td class="text-center">{person.nationality}</td>
            <td class="text-center">
              <div>
                <div class="font-bold text-gray-600">
                  {person.phoneNumber || ""}
                </div>
                <div class="text-sm text-gray-500">
                  {person.email || ""}
                </div>
                {#if !person.phoneNumber && !person.email}
                  <div class="text-xs text-gray-400">Sin datos de contacto</div>
                {/if}
              </div>
            </td>
            <td class="text-center">
              <div class="tooltip" data-tip="Ver">
                <button class="btn btn-sm btn-ghost btn-circle">
                  <slot name="see-icon" />
                </button>
              </div>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="5" class="text-center text-sm text-gray-400 py-8"
              >No se encontaron resultados</td
            >
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
