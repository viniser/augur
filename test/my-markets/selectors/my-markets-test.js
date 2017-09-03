import { describe, it } from 'mocha';
import { assert } from 'chai';
import proxyquire from 'proxyquire';

import * as mockStore from 'test/mockStore';

import { formatNumber, formatEtherTokens, formatShares } from 'utils/format-number';
import { formatDate } from 'utils/format-date';

import speedomatic from 'speedomatic';

describe('modules/portfolio/selectors/login-account-markets', () => {
  proxyquire.noPreserveCache().noCallThru();

  const { store, state } = mockStore.default;
  state.marketCreatorFees = {
    '0xMARKET1': speedomatic.bignum('10'),
    '0xMARKET2': speedomatic.bignum('11')
  };

  const { allMarkets } = store.getState();

  const MarketsAll = () => allMarkets;

  const proxiedSelector = proxyquire('../../../src/modules/my-markets/selectors/my-markets', {
    '../../../store': store,
    '../../markets/selectors/markets-all': MarketsAll
  });

  const actual = proxiedSelector.default();

  const expected = [
    {
      author: '0x0000000000000000000000000000000000000001',
      id: '0xMARKET1',
      description: 'test-market-1',
      endDate: formatDate(new Date('2017/12/12')),
      volume: formatNumber(100),
      fees: formatEtherTokens(speedomatic.bignum('10')),
      numberOfTrades: formatNumber(8),
      averageTradeSize: formatNumber(15),
      openVolume: formatNumber(80),
      outcomes: [
        {
          orderBook: {
            bid: [
              {
                shares: formatShares(10)
              },
              {
                shares: formatShares(10)
              },
            ],
            ask: [
              {
                shares: formatShares(10)
              },
              {
                shares: formatShares(10)
              },
            ]
          }
        },
        {
          orderBook: {
            bid: [
              {
                shares: formatShares(10)
              },
              {
                shares: formatShares(10)
              },
            ],
            ask: [
              {
                shares: formatShares(10)
              },
              {
                shares: formatShares(10)
              },
            ]
          }
        }
      ]
    },
    {
      author: '0x0000000000000000000000000000000000000001',
      id: '0xMARKET2',
      description: 'test-market-2',
      endDate: formatDate(new Date('2017/12/12')),
      volume: formatNumber(100),
      fees: formatEtherTokens(speedomatic.bignum('11')),
      numberOfTrades: formatNumber(8),
      averageTradeSize: formatNumber(15),
      openVolume: formatNumber(80),
      outcomes: [
        {
          orderBook: {
            bid: [
              {
                shares: formatShares(10)
              },
              {
                shares: formatShares(10)
              },
            ],
            ask: [
              {
                shares: formatShares(10)
              },
              {
                shares: formatShares(10)
              },
            ]
          }
        },
        {
          orderBook: {
            bid: [
              {
                shares: formatShares(10)
              },
              {
                shares: formatShares(10)
              },
            ],
            ask: [
              {
                shares: formatShares(10)
              },
              {
                shares: formatShares(10)
              },
            ]
          }
        }
      ]
    }
  ];

  it('should return the expected array', () => {
    assert.deepEqual(actual, expected, `Didn't return the expected array`);
  });

  // it('should deliver the expected shape to augur-ui-react-components', () => {
  //   const proxiedSelector = proxyquire('../../../src/modules/my-markets/selectors/my-markets', {
  //     '../../../store': store,
  //     '../../markets/selectors/markets-all': MarketsAll
  //   });
  //
  //   actual = proxiedSelector.default();
  //
  //   myMarketsAssertions(actual);
  // });
});
