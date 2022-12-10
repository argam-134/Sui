// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Text } from '_app/shared/Text';
import { IconTooltip } from '_app/shared/Tooltip';
import Card, { CardContent, CardFooter, CardHeader } from '_app/shared/card';
import CoinBalance from '_app/shared/coin-balance';
import { ImageIcon } from '_app/shared/image-icon';
// import { totalActiveStakedSelector } from '_app/staking/selectors';
import { useAppSelector, useGetValidators } from '_hooks';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';

export function ValidateDetailFormCard({
    validatorAddress,
    unstake,
}: {
    validatorAddress: string;
    unstake?: boolean;
}) {
    const accountAddress = useAppSelector(({ account }) => account.address);
    const { validators } = useGetValidators(accountAddress);

    const validatorDataByAddress = validators.find(
        ({ address }) => address === validatorAddress
    );

    // const totalStaked = useAppSelector(totalActiveStakedSelector); , isLoading, isError

    return (
        <div className="w-full">
            {validatorDataByAddress && (
                <Card className="mb-4">
                    <CardHeader>
                        <div className="flex gap-2 items-center capitalize py-2.5">
                            <ImageIcon
                                src={validatorDataByAddress.logo}
                                alt={validatorDataByAddress.name}
                                size="small"
                                variant="rounded"
                            />

                            <Text variant="body" weight="semibold">
                                {validatorDataByAddress.name}
                            </Text>
                        </div>
                    </CardHeader>

                    <CardContent padding col gap>
                        <div className="flex gap-2 items-center justify-between ">
                            <div className="flex gap-1 items-baseline text-steel">
                                <Text
                                    variant="body"
                                    weight="medium"
                                    color="steel-darker"
                                >
                                    Staking APY
                                </Text>
                                <IconTooltip tip="Annual Percentage Yield" />
                            </div>

                            <Text
                                variant="body"
                                weight="semibold"
                                color="gray-90"
                            >
                                {validatorDataByAddress.apy}%
                            </Text>
                        </div>
                        {!unstake && (
                            <div className="flex  gap-2 items-center justify-between ">
                                <div className="flex gap-1 items-baseline text-steel">
                                    <Text
                                        variant="body"
                                        weight="medium"
                                        color="steel-darker"
                                    >
                                        # of Delegators
                                    </Text>
                                </div>

                                <Text
                                    variant="body"
                                    weight="medium"
                                    color="steel-darker"
                                >
                                    {validatorDataByAddress.delegationCount}
                                </Text>
                            </div>
                        )}
                        <div className="flex  gap-2 items-center justify-between ">
                            <div className="flex gap-1 items-baseline text-steel">
                                <Text
                                    variant="body"
                                    weight="medium"
                                    color="steel-darker"
                                >
                                    Total Staked
                                </Text>
                            </div>

                            <Text
                                variant="body"
                                weight="medium"
                                color="steel-darker"
                            >
                                <CoinBalance
                                    balance={
                                        validatorDataByAddress.pendingDelegationAmount
                                    }
                                    type={GAS_TYPE_ARG}
                                    diffSymbol={true}
                                />
                            </Text>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Text
                            variant="body"
                            weight="medium"
                            color="steel-darker"
                        >
                            Your Staked SUI
                        </Text>
                        <Text
                            variant="body"
                            weight="medium"
                            color="steel-darker"
                        >
                            <CoinBalance
                                balance={
                                    validatorDataByAddress.pendingDelegationAmount
                                }
                                type={GAS_TYPE_ARG}
                                diffSymbol={true}
                            />
                        </Text>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
