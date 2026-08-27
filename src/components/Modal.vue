<template>
    <Teleport to="body">
        <div v-show="shipsStore.chosenShip" class="modal-overlay"@click.self="closeModal">
            <Transition name="modal">
                <div v-if="shipsStore.chosenShip" class="modal-content" @click.stop>
                    <ShipInfo :ship="shipsStore.chosenShip" />
                    <button @click="closeModal" class="close-modal" ></button>
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
    import { useShipsStore } from '../stores/shipsStore'
    import ShipInfo from './ShipInfo.vue'

    const shipsStore = useShipsStore()

    const closeModal = () => {
        shipsStore.selectShip(null);
    };
</script>

<style lang="scss">

    .modal-overlay {
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        transition: transform .3s, opacity .3s;
    }

    .modal-content {
        position: relative;
        background-color: rgba(255, 255, 255, 0.20);
        border-radius: 5px;
        flex-direction: column;
        gap: 5px;
        padding: 20px;
        display: flex;
        width: clamp(300px, 70%, 800px);

        @media (max-width: 700px) {
            width: clamp(200px, 67%, 600px);
        }
    }

     .modal-content::before {
        content: '';
        position: absolute;
        /* отступ для подложки, чтобы она выглядела как рамка */
        inset: 0;
        border-radius: 7px;
        background: linear-gradient(135deg, #8a8f9a, #d0d4dc, #b0b8c0, #e8ecf0, #a0a8b0);
        background-size: 300% 300%;
        z-index: -1;
        animation: metalGlow 10s ease-in-out infinite alternate;
        box-shadow: 0 0 20px rgba(180, 190, 200, 0.3);
    }

    @keyframes metalGlow {
        0% {
            background-position: 0% 0%;
            opacity: 0.8;
        }
        50% {
            background-position: 100% 100%;
            opacity: 1;
        }
        100% {
            background-position: 0% 0%;
            opacity: 0.8;
        }
    }
    
    .close-modal {
        background: url('../assets/img/close-icon.png');
        width: 41px;
        height: 42px;
        border: unset;
        position: absolute;
        right: -50px;
        top: -9px;
        cursor: pointer;
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }

    .modal-content {
        transform-origin: center;
    }
</style>