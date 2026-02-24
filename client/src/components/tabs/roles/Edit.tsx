import { Button, Dialog, Flex, TextField, Text } from "@radix-ui/themes";
import { useActionState, useState } from "react";
import { api } from "#api";
import type { Role } from "#types";

interface EditProps {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  role: Role | null;
}

export const Edit = ({ open, onOpenChange, title, role }: EditProps) => {
	const action = api.roles.update;
	const [error, setError] = useState('')
  const [, formAction, isPending] = useActionState(
    async (_state: null, formData: FormData) => {
      const form = Object.fromEntries(formData);

      if (role?.id) {
        const updatedRole = {
          ...role,
          ...form,
        };
        try {
          await action(role.id, updatedRole);
          onOpenChange();
        } catch (_err) {
          setError('there was an error')
        }
      }

      return null;
    },
    null,
  );

  if (!role) return null;

  return (
    <Dialog.Root defaultOpen={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description />
        <form action={formAction}>
          <Flex direction="column" gap="3">
            <label htmlFor="name">
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
								id="name"
                name="name"
                placeholder="Name"
                required
                defaultValue={role.name}
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button type="button" color="gray" variant="surface" highContrast>
                Cancel
              </Button>
            </Dialog.Close>

            <Button
              variant="soft"
              color="blue"
              type="submit"
              loading={isPending}
              disabled={isPending}
            >
              {error ? "Try again" : "Save"}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
