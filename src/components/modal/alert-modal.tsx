import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog.tsx";
import { useAlertModal } from "@/store/alert-modal.ts";

export default function AlertModal() {
  const store = useAlertModal();

  if (!store.isOpen) return null;

  const handleActionClick = () => {
    if (store?.onPositive) {
      store.onPositive();
    }

    store.actions.close();
  }

  const handleCloseClick = () => {
    if (store?.onNegative) {
      store.onNegative();
    }
    store.actions.close();
  }

  return (
    <AlertDialog open={store.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{store.title}</AlertDialogTitle>
          <AlertDialogDescription>{store.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseClick}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleActionClick}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}