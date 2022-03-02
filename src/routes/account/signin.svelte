<script lang="ts">
	import { IconButton } from '$components';
	import GitHubIcon from '~icons/cib/github';
</script>

<p>Example content for the account sign in page.</p>

<IconButton icon={GitHubIcon} href="/api/auth/signin/github?redirect=/account/profile">
	Sign in with GitHub
</IconButton>
