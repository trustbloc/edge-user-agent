/*
Copyright SecureKey Technologies Inc. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/

package oidc

import (
	"context"

	"golang.org/x/oauth2"
)

// Client is capable of formatting authorization requests, exchanging the token grant for an access_token
// and id_token, and verifying id_tokens.
type Client interface {
	FormatRequest(state string) string
	Exchange(c context.Context, code string) (*oauth2.Token, error)
	VerifyIDToken(c context.Context, oauthToken OAuth2Token) (Claimer, error)
	UserInfo(ctx context.Context, token *oauth2.Token) (Claimer, error)
}

// OAuth2Token is the oauth2.Token.
type OAuth2Token interface {
	Extra(string) interface{}
	Valid() bool
}

// Claimer is the OIDC id_token.
type Claimer interface {
	Claims(interface{}) error
}
