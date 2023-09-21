<script lang="ts">
  import { PUBLIC_REACT_APP_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
  import Clerk from '@clerk/clerk-js';
  import { onMount, tick } from 'svelte';

  const clerk = new Clerk(PUBLIC_REACT_APP_CLERK_PUBLISHABLE_KEY);

  let isLoaded = false;
  let isSignedIn = false;

  let user = {
    id: 'error',
    firstName: 'error',
  };

  let clerkSignIn: HTMLDivElement;
  let clerkUserButton: HTMLDivElement;

  onMount(async () => {
    try {
      await clerk.load({});
      isLoaded = true;
      if (!clerk.session) {
        clerk.mountSignIn(clerkSignIn);
      } else {
        isSignedIn = true;
        if (clerk.user) {
          user.id = clerk.user.id;
          user.firstName = clerk.user.firstName ?? '';
        }
        tick().then(() => clerk.mountUserButton(clerkUserButton));
      }
    } catch (e) {
      console.log(e);
    }
  });
</script>

<main class="col">
  {#if isSignedIn}
    <div class="flex-end"><div bind:this={clerkUserButton} /></div>
    <div>
      <p>Hello, {user.firstName}! Welcome to Clerk.</p>
    </div>
  {:else}
    <div><div bind:this={clerkSignIn} /></div>
  {/if}
</main>

<style>
  main {
    align-items: center;
    padding: 1em;
  }

  .flex-end {
    align-self: flex-end;
  }
</style>
