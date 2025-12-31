<script>
  import dayjs from "dayjs";
  import advancedFormat from 'dayjs/plugin/advancedFormat.js';
  import utc from 'dayjs/plugin/utc.js';
  import tz from 'dayjs/plugin/timezone';
  import FormItem from "$lib/forms/FormItem.svelte";
  import TextInput from "$lib/forms/TextInput.svelte";
  
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);
  dayjs.extend(tz);
  
  let {
    value = $bindable(null),
    labelDate = "Date",
    labelTime = "Time",
    includeTime = true,
    style = "",
    timeZone = "UTC",
    onChange = () => {}
  } = $props();

  let date = $state();
  let time = $state();
  let errorDate;
  let errorTime;

  // first we extract the date and the time from the given date (if any)
  if (!value) {
    // if we don't have a value, we use the current date and time
    //date = dayjs().format("YYYY-MM-DD");
    // time = dayjs().utc().format("HH:mm");
  }
  else {
    // if we have a value, we use it
    if ( timeZone != "UTC") {
      date = dayjs.utc(value).tz(timeZone).format("YYYY-MM-DD");
      time = dayjs.utc(value).tz(timeZone).format("HH:mm");
    } 
    else {
      date = dayjs(value).format("YYYY-MM-DD");
      time = dayjs(value).utc().format("HH:mm");
    }
  }

  // if the date or time are changed, we update the value
  $effect(() => {
    if (date || time) {
      updateValue();
    }
  });

  // we take the date and the time from the input fields, and generate the final value in this format: yyyy-mm-ddThh:mm:ss
  function updateValue() {
    if (typeof date != "undefined" && date != "") {
      let returnValue = date;
      if (includeTime) {
        time = (typeof time !== "undefined")?time:"00:00";
        if (timeZone != "UTC") {
          dayjs.tz.setDefault(timeZone);
          let dateValue = date + 'T' + time;
          dateValue = new Date(dateValue);
          let timeZoneValue = dayjs.tz(dateValue);
          let convertTimeZoneValue = dayjs.utc(timeZoneValue).format("YYYY-MM-DDTHH:mm:ss");
          returnValue = convertTimeZoneValue;
          dayjs.tz.setDefault(timeZone);
        } 
        else {
          returnValue += "T" + time + ':00';
        }
      }
      value = returnValue;
    }
  }
</script>


<div class="wrapper" class:date-only={!includeTime} timeZone={timeZone}>
  <FormItem label={labelDate} id="node-date" errorMessage={errorDate} style="date-picker {style}">
    <TextInput id="node-date" type="date" bind:value={date} autocomplete="off" finishedTyping={onChange} />
  </FormItem>

  {#if includeTime}
    <FormItem label={labelTime} id="node-time" errorMessage={errorTime} style="time-picker {style}">
      <TextInput id="node-time" type="time" bind:value={time} />
    </FormItem>
  {/if}
</div>


<style>
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }

  .wrapper.date-only {
    display: block;
    max-width: 200px;
  }
</style>