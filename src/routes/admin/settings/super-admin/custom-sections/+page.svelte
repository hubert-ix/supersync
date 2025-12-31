<script>
  import { fade } from 'svelte/transition';
  import { onMount } from "svelte";
  import Button from '$lib/UI/Button.svelte';
  import LoadingSpinner from '$lib/UI/LoadingSpinner.svelte';
  import * as api from '$lib/api';

  let sectionTypes = $state([]);
  let loading = $state(true);

  onMount(async () => {
    let response = await api.get(fetch, "/api/section_types/custom");
    sectionTypes = response.section_types;
    loading = false;
  });
</script>


{#if !loading}
  <p>There are two kinds of page sections: regular sections that are hard coded and always available (like the list section type or the top banner), and custom sections that use the Redactor editor.</p>
  <p>We can define several custom section types, which will each use a specific Redactor template. They will be made available to the user when editing a page.</p>
  <br />

  <p><Button caption="Add a custom page section type" type="outlined" icon="add" href="/manage/custom_section_types/create" /></p>

  <div class="table-wrap width-xlarge" in:fade>

    <table>
      <tbody>
        <tr>
          <th>Section name</th>
          <th>Enabled</th>
        </tr>
        {#each sectionTypes as sectionType}
          <tr>
            <td><a href="/manage/custom_section_types/{sectionType.id}">{sectionType.title}</a></td>
            <td>
              {#if sectionType.enabled}
                <img src="/images/icon-check.png" alt="yes" width="24" />
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

  </div>
{:else}
  <LoadingSpinner />
{/if}