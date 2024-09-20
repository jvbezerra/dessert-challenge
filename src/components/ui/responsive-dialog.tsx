import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { ReactNode } from "react";

interface Props {
  trigger?: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
  description?: ReactNode;
  close?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  open?: boolean;
  modal?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ResponsiveDialog({
  children,
  className,
  trigger,
  title,
  footer,
  description,
  close,
  actions,
  open,
  modal = true,
  defaultOpen,
  onOpenChange,
}: Props) {
  const isDesktop = window?.matchMedia("(min-width: 768px)")?.matches ?? true;

  if (isDesktop) {
    return (
      <Dialog
        modal={modal}
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          actions={actions}
          closable
          className={`flex flex-col ${className}`}
        >
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle asChild>{title}</DialogTitle>}
              {description && (
                <DialogDescription asChild>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {children}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className={className}>
        {(title || description) && (
          <DrawerHeader className="gap-0">
            <DrawerTitle asChild>{title}</DrawerTitle>
            <DrawerDescription asChild>{description}</DrawerDescription>
            <div className="absolute top-5 right-3 flex ml-auto gap-2">
              {actions}
            </div>
          </DrawerHeader>
        )}
        {children}
        {(footer || close) && (
          <DrawerFooter>
            {footer}
            {close && <DrawerClose asChild>{close}</DrawerClose>}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
