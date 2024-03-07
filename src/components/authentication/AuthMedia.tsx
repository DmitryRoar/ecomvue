'use client';

import useAuth from 'hooks/useAuth';
import { redirect } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { SocialMediaType } from 'types/auth';

export default function AuthMedia({ socialMediaType, code }: { socialMediaType: keyof typeof SocialMediaType; code?: string }) {
  const { onRegisterViaMedia } = useAuth();

  const sendRegisterMedia = useCallback(async () => {
    if (code) {
      await onRegisterViaMedia(socialMediaType, code);
    } else {
      redirect('/register');
    }
  }, [code, onRegisterViaMedia, socialMediaType]);

  useEffect(() => {
    sendRegisterMedia();
  }, [code, sendRegisterMedia]);

  return null;
}
