import { create } from "zustand";
import { Vault } from "../../types";

interface VaultState {
    vaultList: Vault[]
    loadedOnce: boolean
    setVaults: (vaults: Vault[]) => void
    clearVaults: () => void 
    createVault: (vault: Vault) => void
    updateVault: (vault: Vault) => void
    deleteVaultById: (vaultId: string) => void
}

export const useVaultStore = create<VaultState>()(
    (set) => ({
        vaultList: [],
        loadedOnce: false,
        setVaults: vaults => set(() => ({ vaultList: vaults, loadedOnce: true })),
        clearVaults: () => set(() => ({ vaultList: [], loadedOnce: false })),
        createVault: vault => set(({ vaultList }) => ({ vaultList: [...vaultList, vault] })),
        updateVault: vault => set(({ vaultList }) => ({
            vaultList: vaultList.map(i => i.id === vault.id ? vault : i)
        })),
        deleteVaultById: vaultId => set(({ vaultList }) => ({
            vaultList: vaultList.filter(i => i.id !== vaultId)
        }))
    })
)