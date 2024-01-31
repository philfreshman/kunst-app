<template>
  <div class="h-screen w-full flex flex-col">
    <Header />

    <div class="h-full w-full flex flex-row overflow-hidden">
      <!--SIDE-->
      <div class="h-full w-[200px] flex flex-col justify-between p-4 border-r-2 border-gray-200 dark:border-gray-800">
        <Side />
        <div class="w-full flex flex-row justify-between">
          <LogoutButton />
          <ThemeSwitcher />
          <SettingsButton />
        </div>
      </div>

      <!--CONTENT-->
      <div class="w-full h-full flex flex-col rounded-[6px] p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
