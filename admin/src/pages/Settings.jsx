import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Typography,
  Main,
  Accordion,
  Checkbox,
  Grid,
  Divider,
} from "@strapi/design-system";
import { Information } from "@strapi/icons";
import { useNotification, useFetchClient } from "@strapi/strapi/admin";

const SettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const { toggleNotification } = useNotification();
  const { get, put } = useFetchClient();

  useEffect(() => {
    get("/strapi-api-deep-populate/settings").then((res) => {
      if (res.data) setSettings(res.data);
    });
  }, [get]);

  const toggleSetting = (uid, field) => {
    setSettings((prev) => ({
      ...prev,
      [uid]: {
        ...prev[uid],
        [field]: !prev[uid][field],
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await put("/strapi-api-deep-populate/settings", settings);
      toggleNotification({ type: "success", message: "Settings updated" });
    } catch (err) {
      toggleNotification({ type: "danger", message: "Failed to update" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Main>
      <Box padding={8} background="neutral100">
        <Flex justifyContent="space-between">
          <Typography variant="alpha">API Population Settings</Typography>
          <Button onClick={handleSave} loading={isSaving}>
            Save
          </Button>
        </Flex>
      </Box>

      <Box paddingLeft={8} paddingRight={8}>
        <Box background="neutral0" padding={6} shadow="filterShadow" hasRadius>
          <Box
            background="primary100"
            padding={4}
            marginBottom={6}
            hasRadius
            borderStyle="solid"
            borderWidth="1px"
            borderColor="primary200"
          >
            <Flex alignItems="flex-start" gap={3}>
              {/* Information Icon */}
              <Information color="primary600" aria-hidden />

              <Flex direction="column" alignItems="stretch" gap={2}>
                <Typography
                  variant="omega"
                  fontWeight="bold"
                  textColor="primary600"
                >
                  Configuration Guide
                </Typography>

                <Box>
                  <Typography variant="omega" fontWeight="bold">
                    Images:{" "}
                  </Typography>
                  <Typography variant="omega">
                    Automatically includes all media fields and single/multiple
                    images in the API response.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="omega" fontWeight="bold">
                    Relations:{" "}
                  </Typography>
                  <Typography variant="omega">
                    Automatically populates linked entries and relational data
                    fields.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="omega" fontWeight="bold">
                    Components:{" "}
                  </Typography>
                  <Typography variant="omega">
                    Ensures that nested components and dynamic zones are fully
                    expanded in the JSON output.
                  </Typography>
                </Box>
              </Flex>
            </Flex>
          </Box>

          <Typography variant="beta">Content-Type Permissions</Typography>
          <Divider marginTop={4} marginBottom={4} />

          <Accordion.Root value={expandedId} onValueChange={setExpandedId}>
            {Object.entries(settings).map(([uid, config]) => (
              <Accordion.Item key={uid} value={uid}>
                <Accordion.Header>
                  <Accordion.Trigger>
                    <Typography variant="omega" fontWeight="bold">
                      {/* {uid} */}
                      {config.displayName || uid}
                    </Typography>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Box padding={4} background="neutral100">
                    <Grid.Root gap={4}>
                      <Grid.Item col={4}>
                        <Checkbox
                          onCheckedChange={() =>
                            toggleSetting(uid, "showImages")
                          }
                          checked={config.showImages}
                        >
                          Images
                        </Checkbox>
                      </Grid.Item>
                      <Grid.Item col={4}>
                        <Checkbox
                          onCheckedChange={() =>
                            toggleSetting(uid, "showRelations")
                          }
                          checked={config.showRelations}
                        >
                          Relations
                        </Checkbox>
                      </Grid.Item>
                      <Grid.Item col={4}>
                        <Checkbox
                          onCheckedChange={() =>
                            toggleSetting(uid, "showComponents")
                          }
                          checked={config.showComponents}
                        >
                          Components
                        </Checkbox>
                      </Grid.Item>
                    </Grid.Root>
                  </Box>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Box>
      </Box>
    </Main>
  );
};

export default SettingsPage;
