<script>
  import { currentUser } from '$lib/stores/currentUser';
  import Notification from "$lib/teasers/Notification.svelte";
  import NotificationSkeleton from "$lib/skeletons/NotificationSkeleton.svelte";
  import * as api from '$lib/api';
  
  let notifications = $state([]);
  let unreadNotifications = [];
  let oldNotifications = [];
  let loading = $state(true);

  async function loadNotifications() {
    loading = true;
    let response = await api.get(fetch, "/api/notifications", {user_id: $currentUser.id, limit: 10});
    notifications = response.notifications;
    for (let i in notifications) {
      if (notifications[i].read) {
        oldNotifications.push(notifications[i]);
      }
      else {
        unreadNotifications.push(notifications[i]);
      }
    }
    loading = false;
    // mark the new notifications as read
    for (let i in unreadNotifications) {
      await api.patch(fetch, "/api/notifications/" + unreadNotifications[i].id, {read: true, profile_id: $currentUser.id})
    }
  }
  
  function slideLeft(node, { delay = 0, duration = 200 }) {
    return {
      delay,
      duration,
      css: t => 
        `opacity: ${Math.min(t * 20, 1)};` +
        `right: ${320 * t - 320}px;`
    };
  }
</script>


<div class="notifications" id="notifications" transition:slideLeft onintroend={loadNotifications}>
  
  <div class="top">
    <h6>Notifications</h6>
  </div>
  
  {#if (notifications.length > 0)}

    {#if unreadNotifications.length > 0}
      <div class="heading"><h6>New</h6></div>
      {#each unreadNotifications as notification}
        <Notification {notification} />
      {/each}
    {/if}

    {#if oldNotifications.length}
      <div class="heading"><h6>Earlier</h6></div>
      {#each oldNotifications as notification}
        <Notification {notification} />
      {/each}
    {/if}

  {:else}

    {#if !loading}
      <div class="no-result">No notifications</div>
    {/if}

  {/if}
  
  <div class="loading">
    {#if loading}
      <NotificationSkeleton />
      <NotificationSkeleton />
      <NotificationSkeleton />
      <NotificationSkeleton />
      <NotificationSkeleton />
      <NotificationSkeleton />
      <NotificationSkeleton />
      <NotificationSkeleton />
    {/if}
  </div>
  
</div>


<style>
  .notifications {
    position: fixed;
    overflow-y: scroll;
    top: 0px;
    right: 0px;
    z-index: 8;
    width: 320px;
    height: 100vh;
    padding: 85px 0 63px;
    border-left: 1px solid #e0e0e0;
    background-color: #fff;
    transition: right 0.5s;
  }
  
  .top {
    display: flex;
    height: 56px;
    padding-left: 74px;
    align-items: center;
    border-bottom: 1px solid #eee;
    background: #f0f2f3 url(/images/icon-arrow-right.png) 24px 15px no-repeat;
    background-size: 24px;
  }
  
  .heading {
    display: flex;
    margin-top: 24px;
    margin-bottom: 8px;
    align-items: center;
  }
  
  .heading:before {
    content: '';
    height: 1px;
    background-color: #e0e0e0;
    width: 16px;
    margin-right: 8px;
  }
  
  .heading:after {
    content: '';
    height: 1px;
    background-color: #e0e0e0;
    margin-left: 8px;
    flex: 1;
  }
  
  .no-result {
    text-align: left;
    padding: 16px 24px;
  }
</style>