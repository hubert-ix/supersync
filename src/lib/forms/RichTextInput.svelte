<script>
  import { PUBLIC_IMAGEKIT_ID, PUBLIC_IMAGEKIT_PUBLIC_KEY, PUBLIC_IMAGEKIT_PRIVATE_KEY } from '$env/static/public';
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';
  import ImageKit from 'imagekit';
  import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";
  import Tick from "$lib/forms/Tick.svelte";

  let {
    value = $bindable(),
    valueEmail = $bindable(""),
    type = "full",
    id,
    enableAutoUpdate = false,
    enableEmailFormat = false,
    includeVariables = false,
    variables = [],
    update = () => {} // only used with enableAutoUpdate
  } = $props();
  
  let loading = $state(true);
  let app = null;
  let valueChanged = $state(false);

  let imagekit = new ImageKit({
    publicKey: PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: PUBLIC_IMAGEKIT_ID
  });

  onMount(async () => {
    if (browser) {
    
      // load the editor and plugins
      const editor = await import('$lib/redactor/redactor.usm.min.js');
      await import('$lib/redactor/plugins/emoji/emoji.min.js');
      await import('$lib/redactor/plugins/filelink/filelink.min.js');

      let plugins = ["emoji", "filelink"];

      // import email plugin
      if (enableEmailFormat) {
        await import('$lib/redactor/plugins/email/email.min.js');
        plugins.push("email");
      }
      else if (type != "limited") {
        // we only add the margin plugin if we don't have email formatting enabled
        plugins.push("margin");
        editor.default.add("plugin", "margin", marginPlugin)
      }

      // import variable plugin
      if (includeVariables) {
        await import('$lib/redactor/plugins/variable/variable.min.js');
        plugins.push("variable");
      }
            
      // start the editor
      let options = {
        minHeight: '120px',
        paste: {
          plaintext: true
        },
        placeholder: '',
        plugins,
        theme: 'light',
        toolbar: {
          hide: []
        },
        buttons: {
          extrabar: []
        },
        filelink: {
          //upload: config.drupal_base_url + 'maze-api/upload-file/',
        },
        variable: {
          items: variables,
          start: '{%',
          end: '%}'
        },
        image: {
          name: 'image',
          url: false,
          upload: function(upload, data) {
            let image = data.files[0];
            imagekit.upload({
              file: image,
              fileName: image.name,
              folder: "editor"
            }, function(error, result) {
                if (error) {
                  console.log("ERROR", error);
                }
                else {
                  console.log("uploaded image", result);
                  let response = {
                    file: {
                      url: result.url + "?tr=w-600",
                      id: result.id
                    }
                  };
                  upload.complete(response, data.e);
                }
            });
          },
        },
        subscribe: {
          'editor.parse': function () {
            loading = false;
          },
          'editor.change': function (e) {
            valueChanged = true;
            setTimeout(() => {valueChanged = false}, 3000);
            value = e.params.html;
            if (enableEmailFormat) {
              valueEmail = app.editor.getEmail();
            }
            if (enableAutoUpdate) {
              update(value, valueEmail);
            }
          },
        },  
      };
      if (type == "limited") {
        options.source = false;
        options.toolbar.hide = ['add', 'alignment', 'deleted', 'table', 'moreinline', 'format', 'image', 'emoji', 'link'];
      }
      if (type == "inline") {
        options.nocontainer = true;
        options.nostyle = true;
        options.context = {
          hide: ['format']
        }
      }
      app = editor.default('#redactor-' + id, options);
      loading = false;
    }
  });

  onDestroy(() => {
    if (app) {
      app.destroy();
    }
  })

  // define the margin plugin
  let marginPlugin = {
    start() {
      this.app.toolbar.add('mybutton', {
        title: 'Bottom margin',
        icon: '<img src="/images/editor/icon-margin.png" width="24" />',
        command: 'margin.popup'
      });
    },
    popup(e, button) {
      let instance = this.app.block.get();
      let className = instance.getClassname();
      let items = {
        none: {
          title: 'No margin',
          command: 'margin.toggle',
          active: (className === null)
        },
        x_small: {
          title: 'x-small',
          command: 'margin.toggle',
          active: (className == "margin-bottom-x-small")
        },
        small: {
          title: 'small',
          command: 'margin.toggle',
          active: (className == "margin-bottom-small")
        },
        medium: {
          title: 'medium',
          command: 'margin.toggle',
          active: (className == "margin-bottom-medium")
        },
        large: {
          title: 'large',
          command: 'margin.toggle',
          active: (className == "margin-bottom-large")
        },
        x_large: {
          title: 'x-large',
          command: 'margin.toggle',
          active: (className == "margin-bottom-x-large")
        }
      };
      let dropdown = this.app.create('dropdown', 'mydropdown', { items: items });
      this.app.dropdown.open(e, button, dropdown);
    },
    toggle(params, button, name) {
      this.app.dropdown.close();
      // add selected class to block
      let instance = this.app.block.get();
      let old = instance.getClassname();
      let className = "margin-bottom-" + name;
      className = className.replace("_", "-");
      instance.getBlock().removeClass(old);
      instance.setClassname(className);
    }
  };
</script>


<svelte:head>
  <link rel="stylesheet" href="/editor-styles/redactor.min.css" />
  <link rel="stylesheet" href="/editor-styles/redactor-custom.css" />
</svelte:head>

<div>
  
  {#if loading}
    <LoadingSpinner />
  {/if}
  
  <div class="wrapper">
    <textarea style="display: none;" id="redactor-{id}" name={id} bind:value></textarea>
  </div>
  
</div>

{#if valueChanged && enableAutoUpdate}
  <Tick />
{/if}


<style>
  .wrapper {
    border: solid 2px var(--color-borders);
    border-radius: 0.5rem;
    overflow: hidden;
  }
</style>