<template>
  <div class="h-screen w-full flex flex-col">

    <Header/>

    <div class="h-full w-full flex flex-row overflow-hidden">

      <!--SIDE-->
      <div class="h-full flex flex-col justify-between p-4 w-52 border-r-2 border-gray-200 dark:border-gray-800">
        <div>
          <Side/>
        </div>
        <div class="w-full flex flex-row justify-between ">
          <LogoutButton/>
          <ThemeSwitcher/>
          <SettingsButton/>
        </div>
      </div>

      <!--CONTENT-->
      <div class="h-full w-full overflow-scroll p-4">
        <slot/>
      </div>

    </div>

  </div>
</template>
