<template>
    <Banner />
    <LandingHeader />
    <div class="w-full p-5 min-h-screen flex justify-center items-center sm:px-8 md:px-12 lg:px-8 max-w-screen-lg lg:max-w-screen-2xl mx-auto ">
        <slot />
    </div>
    <LandingFooter />
</template>