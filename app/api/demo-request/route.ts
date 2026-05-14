type DemoRequestPayload = {
  industry?: unknown;
  role?: unknown;
  companySize?: unknown;
  email?: unknown;
  automationNeeds?: unknown;
  website?: unknown;
};

type ValidatedDemoRequest = {
  industry: string;
  role: string;
  companySize: string;
  email: string;
  automationNeeds: string;
};

const companySizeOptions = new Set([
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501+",
]);

function jsonResponse(body: { ok: boolean; error?: string }, status: number) {
  return Response.json(body, { status });
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function truncate(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function escapeSlackText(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function validatePayload(payload: DemoRequestPayload): ValidatedDemoRequest | null {
  const website = getString(payload.website);

  if (website) {
    return null;
  }

  const industry = truncate(getString(payload.industry), 120);
  const role = truncate(getString(payload.role), 120);
  const companySize = getString(payload.companySize);
  const email = truncate(getString(payload.email).toLowerCase(), 254);
  const automationNeeds = truncate(getString(payload.automationNeeds), 2000);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (
    !industry ||
    !role ||
    !companySizeOptions.has(companySize) ||
    !email ||
    !isValidEmail ||
    !automationNeeds
  ) {
    return null;
  }

  return {
    industry,
    role,
    companySize,
    email,
    automationNeeds,
  };
}

function formatSlackMessage(request: ValidatedDemoRequest) {
  const submittedAt = new Date().toISOString();
  const industry = escapeSlackText(request.industry);
  const role = escapeSlackText(request.role);
  const companySize = escapeSlackText(request.companySize);
  const email = escapeSlackText(request.email);
  const automationNeeds = escapeSlackText(request.automationNeeds);

  return {
    text: `New Reliever demo request from ${email}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New Reliever demo request",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Industry*\n${industry}`,
          },
          {
            type: "mrkdwn",
            text: `*Role*\n${role}`,
          },
          {
            type: "mrkdwn",
            text: `*Company size*\n${companySize}`,
          },
          {
            type: "mrkdwn",
            text: `*Email*\n${email}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Automation needs*\n${automationNeeds}`,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Submitted at ${submittedAt}`,
          },
        ],
      },
    ],
  };
}

export async function POST(request: Request) {
  let payload: DemoRequestPayload;

  try {
    payload = (await request.json()) as DemoRequestPayload;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid request body." }, 400);
  }

  const demoRequest = validatePayload(payload);

  if (!demoRequest) {
    return jsonResponse({ ok: false, error: "Invalid form submission." }, 400);
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return jsonResponse(
      { ok: false, error: "Slack webhook is not configured." },
      500,
    );
  }

  try {
    const slackResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formatSlackMessage(demoRequest)),
    });

    if (!slackResponse.ok) {
      return jsonResponse({ ok: false, error: "Slack notification failed." }, 502);
    }
  } catch {
    return jsonResponse({ ok: false, error: "Slack notification failed." }, 502);
  }

  return Response.json({ ok: true });
}
